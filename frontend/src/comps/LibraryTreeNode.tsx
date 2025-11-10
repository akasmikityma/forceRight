
import type React from "react"
import { useRef } from "react"
import { IoMdAddCircleOutline } from "react-icons/io"
import { FaTrash } from "react-icons/fa"
import { useDrag, useDrop } from "react-dnd"
import type { Library } from "@/screens/LiBrary"

const ITEM_TYPE = "LIBRARY"

interface LibraryTreeNodeProps {
  library: Library
  onSelectLibrary: (libraryId: number) => void
  onAddSubLibrary: (parentId: number) => void
  onMoveLibrary: (draggedId: number, newParentId: number | null) => void
  onDeleteLibrary: (libraryId: number) => void
  expandedLibs: Set<number>
  toggleLibrary: (libId: number) => void
}

const LibraryTreeNode: React.FC<LibraryTreeNodeProps> = ({
  library,
  onSelectLibrary,
  onAddSubLibrary,
  onMoveLibrary,
  onDeleteLibrary,
  expandedLibs,
  toggleLibrary,
}) => {
  const hasChildren = library.children && library.children.length > 0
  const isExpanded = expandedLibs.has(library.id)
  const ref = useRef<HTMLDivElement | null>(null)

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: library.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item: { id: number }, monitor) => {
      if (!ref.current || item.id === library.id) return false
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return false
      const rect = ref.current.getBoundingClientRect()
      const y = clientOffset.y - rect.top
      const topCut = rect.height * 0.2
      const bottomCut = rect.height * 0.8
      return y >= topCut && y <= bottomCut
    },
    drop: (item: { id: number },) => {
      if (item.id === library.id) return
      onMoveLibrary(item.id, library.id)
    },
  })

  drag(drop(ref))

  return (
    <div ref={ref} className="pl-4 mb-2">
      <div
        ref={drag}
        className={`flex items-center py-2 px-3 rounded-lg transition-all ${isDragging ? "opacity-50 bg-blue-100" : "hover:bg-blue-50 border-l-4 border-orange-400"}`}
        style={{ cursor: "move" }}
      >
        <div className="flex items-center flex-1 min-w-0">
          {hasChildren && (
            <button
              onClick={() => toggleLibrary(library.id)}
              className="mr-2 w-4 h-4 flex items-center justify-center text-blue-600 font-bold"
            >
              {isExpanded ? "−" : "+"}
            </button>
          )}
          <div
            onClick={() => onSelectLibrary(library.id)}
            className="cursor-pointer p-2 rounded flex-1 min-w-0 text-gray-700 font-medium"
          >
            <span className="block truncate">{library.name}</span>
            {library.problems && <span className="text-blue-500 text-xs ml-2">({library.problems.length})</span>}
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAddSubLibrary(library.id)
            }}
            className="p-1 hover:bg-orange-100 rounded-full transition-colors"
            title="Add sub-library"
          >
            <IoMdAddCircleOutline className="w-5 h-5 text-orange-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDeleteLibrary(library.id)
            }}
            className="p-1 hover:bg-red-100 rounded-full transition-colors"
            title="Delete library"
          >
            <FaTrash className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div className="ml-4 border-l-2 border-blue-300">
          {library.children!.map((child) => (
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
  )
}

export default LibraryTreeNode
