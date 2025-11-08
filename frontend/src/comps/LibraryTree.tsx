// import { Library } from '@/screens/LiBrary';
// import React, { useState } from 'react';
// import { IoMdAddCircleOutline } from "react-icons/io";

// interface LibraryTreeProps {
//     libraries: Library[];
//     onSelectLibrary: (libraryId: number) => void;
//     onAddSubLibrary: (parentId: number) => void;
// }

// const LibraryTree: React.FC<LibraryTreeProps> = ({ libraries, onSelectLibrary, onAddSubLibrary }) => {
//     const [expandedLibs, setExpandedLibs] = useState<Set<number>>(new Set());

//     const toggleLibrary = (libId: number) => {
//         const newExpanded = new Set(expandedLibs);
//         if (newExpanded.has(libId)) {
//             newExpanded.delete(libId);
//         } else {
//             newExpanded.add(libId);
//         }
//         setExpandedLibs(newExpanded);
//     };

//     const renderLibrary = (library: Library) => {
//         const hasChildren = library.children && library.children.length > 0;
//         const isExpanded = expandedLibs.has(library.id);

//         return (
//             <div key={library.id} className="pl-4">
//                 <div className="flex items-center py-2">
//                     <div className="flex items-center flex-1">
//                         {hasChildren && (
//                             <button 
//                                 onClick={() => toggleLibrary(library.id)}
//                                 className="mr-2 w-4 h-4 flex items-center justify-center"
//                             >
//                                 {isExpanded ? '−' : '+'}
//                             </button>
//                         )}
//                         <div 
//                             onClick={() => onSelectLibrary(library.id)}
//                             className="cursor-pointer hover:bg-gray-100 p-2 rounded flex-1"
//                         >
//                             {library.name}
//                             {library.problems && (
//                                 <span className="text-gray-500 text-sm ml-2">
//                                     ({library.problems.length})
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                     <button
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             onAddSubLibrary(library.id);
//                         }}
//                         className="p-1 hover:bg-gray-100 rounded-full"
//                         title="Add sub-library"
//                     >
//                         <IoMdAddCircleOutline className="w-5 h-5 text-blue-500" />
//                     </button>
//                 </div>
//                 {isExpanded && hasChildren && (
//                     <div className="ml-4 border-l-2 border-gray-200">
//                         {library.children?.map(child => renderLibrary(child))}
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <div className="bg-white rounded-lg shadow p-4">
//             {libraries.map(lib => renderLibrary(lib))}
//         </div>
//     );
// };

// export default LibraryTree;

import { Library } from '@/screens/LiBrary';
import React, { useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {LibraryTreeInner} from './LibraryTreeInner';
interface LibraryTreeProps {
    libraries: Library[];
    onSelectLibrary: (libraryId: number) => void;
    onAddSubLibrary: (parentId: number) => void;
    onMoveLibrary: (draggedId: number, newParentId: number | null) => void;
    onDeleteLibrary: (libraryId: number) => void;
}
const LibraryTree: React.FC<LibraryTreeProps> = (props) => (
    <DndProvider backend={HTML5Backend}>
        <LibraryTreeInner {...props} />
    </DndProvider>
);

export default LibraryTree;