import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import LibraryTreeNode from './LibraryTreeNode'; // Adjust path as needed
import { Library } from '@/screens/LiBrary';
const ITEM_TYPE = 'LIBRARY';
interface LibraryTreeProps {
    libraries: Library[];
    onSelectLibrary: (libraryId: number) => void;
    onAddSubLibrary: (parentId: number) => void;
    onMoveLibrary: (draggedId: number, newParentId: number | null) => void;
    onDeleteLibrary: (libraryId: number) => void;
}
export const LibraryTreeInner: React.FC<LibraryTreeProps & { parentId?: number | null }> = ({
    libraries, onSelectLibrary, onAddSubLibrary, onMoveLibrary, onDeleteLibrary, parentId = null
}) => {
    const [expandedLibs, setExpandedLibs] = useState<Set<number>>(new Set());

    const toggleLibrary = (libId: number) => {
        const newExpanded = new Set(expandedLibs);
        if (newExpanded.has(libId)) {
            newExpanded.delete(libId);
        } else {
            newExpanded.add(libId);
        }
        setExpandedLibs(newExpanded);
    };

    // Root drop zone (for making a library a parent)
    const [, dropToRoot] = useDrop({
        accept: ITEM_TYPE,
        drop: (item: { id: number }) => {
            onMoveLibrary(item.id, null);
        },
        canDrop: () => parentId === null,
    });

    return (
        <div ref={dropToRoot} className="bg-white rounded-lg shadow p-4 min-h-[50px] space-y-3">
            {libraries.map(lib => (
                <LibraryTreeNode
                    key={lib.id}
                    library={lib}
                    onSelectLibrary={onSelectLibrary}
                    onAddSubLibrary={onAddSubLibrary}
                    onMoveLibrary={onMoveLibrary}
                    onDeleteLibrary={onDeleteLibrary}
                    expandedLibs={expandedLibs}
                    toggleLibrary={toggleLibrary}
                />
            ))}
        </div>
    );
};