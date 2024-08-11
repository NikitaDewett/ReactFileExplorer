import React, { useEffect, useState } from 'react';
import { FaFolder, FaFile, FaImage } from 'react-icons/fa';
import './style.css';
import { fetchFile, Item } from '../../utils';

interface FileViewerProps {
    item: { name: string; content?: string; items?: Item[]; isFolder?: boolean; type?: string; url?: string } | null;
    onFolderClick: (folder: any) => void;
}

const FileViewer: React.FC<FileViewerProps> = ({ item, onFolderClick }) => {
    const [activeItem, setActiveItem] = useState<Item | null>(null);
    useEffect(() => {
        // If it's not a folder, we want to set the active item in case of a file or image
        if(!item?.isFolder) {
            setActiveItem(item as Item);
        }
        return () => {
            setActiveItem(null);
        };
    }, [item]);

    const handleDoubleClick = async (subItem: Item) => {
        if (subItem.type === 'file') {
            if (subItem.link) {
                const fileContent = await fetchFile(subItem.link);
                setActiveItem({ ...subItem, content: fileContent });
            } else {
                console.error('File link is undefined');
            }
        } else if (subItem.isFolder) {
            onFolderClick(subItem);
        } else {
            setActiveItem(subItem);
        }
    };

    if (!item) return <div>Select a file or folder to view its content</div>;

    const renderSubItemIcon = (subItemType: string) => {
        switch(subItemType) {
            case 'folder':
                return <FaFolder className="itemIcon" />;
            case 'file':
                return <FaFile className="itemIcon" />;
            case 'image':
                return <FaImage className="itemIcon" />;
            default:
                return <FaFile className="itemIcon" />;
        }
    };
    return (
        <div>
            <div>
                {item?.isFolder && <h3>Content of {item.name}:</h3>}   
                <div className="gridContainer">
                    {item?.items?.map((subItem) => (
                        <div className="gridItem" key={subItem.id} onDoubleClick={() => handleDoubleClick(subItem)}>
                            {renderSubItemIcon(subItem.type || '')}
                            <span>{subItem.name}</span>
                        </div>
                    ))}
                </div>
                {activeItem && !activeItem?.isFolder && <div className="activeItemContainer">
                <h3>Content of {activeItem.name}:</h3>
                    {activeItem.type === 'image' ? <img src={activeItem.url} alt={activeItem.name} className="imageViewer"/> : <pre>{activeItem.content}</pre>}
                </div>}
            </div>
        </div>
    );
};

export default FileViewer;