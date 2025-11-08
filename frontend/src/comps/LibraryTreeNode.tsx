import React, { useRef, useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { useDrag, useDrop } from 'react-dnd';
import { Library } from '@/screens/LiBrary';
const ITEM_TYPE = 'LIBRARY';

interface LibraryTreeNodeProps {
    library: Library;
    onSelectLibrary: (libraryId: number) => void;
    onAddSubLibrary: (parentId: number) => void;
    onMoveLibrary: (draggedId: number, newParentId: number | null) => void;
    onDeleteLibrary: (libraryId: number) => void;
    expandedLibs: Set<number>;
    toggleLibrary: (libId: number) => void;
}

const LibraryTreeNode: React.FC<LibraryTreeNodeProps> = ({
    library, onSelectLibrary, onAddSubLibrary, onMoveLibrary, onDeleteLibrary, expandedLibs, toggleLibrary
}) => {
    const hasChildren = library.children && library.children.length > 0;
    const isExpanded = expandedLibs.has(library.id);
    const ref = useRef<HTMLDivElement | null>(null);
    // Drag source
    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { id: library.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Drop target
    // const [, drop] = useDrop({
    //     accept: ITEM_TYPE,
    //     drop: (item: { id: number }) => {
    //         if (item.id !== library.id) {
    //             onMoveLibrary(item.id, library.id);
    //         }
    //     },
    //     canDrop: (item: { id: number }) => item.id !== library.id,
    // });
    const [, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item: { id: number }, monitor) => {
      // avoid self-drop
      if (!ref.current || item.id === library.id) return false;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return false;
      const rect = ref.current.getBoundingClientRect();
      const y = clientOffset.y - rect.top;
      // accept only when pointer is not in top 20% or bottom 20% (adjust thresholds as needed)
      const topCut = rect.height * 0.2;
      const bottomCut = rect.height * 0.8;
      return y >= topCut && y <= bottomCut;
    },
    drop: (item: { id: number }, monitor) => {
      if (item.id === library.id) return;
      onMoveLibrary(item.id, library.id);
    },
  });

  // Attach both refs
  drag(drop(ref));

    return (
        <div ref={ref} className="pl-4 mb-2">
            <div
                ref={drag}
                className={`flex items-center py-2 ${isDragging ? 'opacity-50' : ''}`}
                style={{ cursor: 'move' }}
            >
                <div className="flex items-center flex-1 min-w-0">
                    {hasChildren && (
                        <button
                            onClick={() => toggleLibrary(library.id)}
                            className="mr-2 w-4 h-4 flex items-center justify-center"
                        >
                            {isExpanded ? '−' : '+'}
                        </button>
                    )}
                    <div
                        onClick={() => onSelectLibrary(library.id)}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded flex-1 min-w-0"
                    >
                        <span className="block truncate"> {/* truncate long names with ellipsis */}
                            {library.name}
                        </span>
                        {library.problems && (
                            <span className="text-gray-500 text-sm ml-2">
                                ({library.problems.length})
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2 ml-3"> {/* ensure buttons stay visible to the right */}
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    onAddSubLibrary(library.id);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full"
                    title="Add sub-library"
                >
                    <IoMdAddCircleOutline className="w-5 h-5 text-blue-500" />
                </button>
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    onDeleteLibrary(library.id);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full"
                    title="Delete library"
                >
                    <FaTrash className="w-4 h-4 text-red-500" />
                </button>
                </div>
            </div>
            {isExpanded && hasChildren && (
                <div className="ml-4 border-l-2 border-gray-200">
                    {library.children!.map(child => (
                        <LibraryTreeNode
                            key={child.id}
                            library={child}
                            onSelectLibrary={onSelectLibrary}
                            onAddSubLibrary={onAddSubLibrary}
                            onMoveLibrary={onMoveLibrary}
                            onDeleteLibrary={onDeleteLibrary}
                            expandedLibs={expandedLibs}
                            toggleLibrary={toggleLibrary}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LibraryTreeNode;