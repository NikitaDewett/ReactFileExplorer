import React, { useEffect, useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile, FaImage } from 'react-icons/fa';
import './style.css';
import { Item } from '../../utils';

interface FolderProps {
    folderItem: Item;
    onSelect: (item: Item) => void;
    onFolderClick: (item: Item) => void;
    activeFolderId: string | null;
}

const Folder: React.FC<FolderProps> = ({ folderItem, onSelect, onFolderClick, activeFolderId }) => {
    const [expand, setExpand] = useState(false);
    const isActive = folderItem.id === activeFolderId;
    const handleDoubleClick = () => {
        if (folderItem.isFolder) {
            setExpand(!expand);
        } else {
            onSelect(folderItem);
        }
    };
    useEffect(() => {
        if(activeFolderId === folderItem.id) {
            setExpand(true);
        }
    }, [activeFolderId]);

    const handleClick = () => {
        if (folderItem.isFolder) {
            onFolderClick(folderItem);
        }
    };

    const renderIcon = () => {
        if (folderItem.isFolder) {
            return expand ? <FaFolderOpen /> : <FaFolder />;
        } else if (folderItem.type === 'image') {
            return <FaImage />;
        } else {
            return <FaFile />;
        }
    };

    return (
        <div>
            <div 
                onClick={handleClick} 
                onDoubleClick={handleDoubleClick}
                className="folderContainer"
                style={{ 
                    backgroundColor: isActive ? 'lightblue' : 'transparent',
                }}
            >
                {renderIcon()} {folderItem.name}
            </div>
            {expand && folderItem.items && (
                <div className="innerFolderContainer">
                    {folderItem.items.map((item: Item) => (
                        <Folder 
                            key={item.id} 
                            folderItem={item} 
                            onSelect={onSelect} 
                            onFolderClick={onFolderClick} 
                            activeFolderId={activeFolderId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Folder;