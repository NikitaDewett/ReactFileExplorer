import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile, FaImage } from 'react-icons/fa';
import './style.css';
import { Item } from '../../utils';

interface FolderProps {
    explorer: Item;
    onSelect: (item: Item) => void;
    onFolderClick: (item: Item) => void;
    activeFolderId: string | null;
}

const Folder: React.FC<FolderProps> = ({ explorer, onSelect, onFolderClick, activeFolderId }) => {
    const [expand, setExpand] = useState(false);
    const isActive = explorer.id === activeFolderId;
    const handleDoubleClick = () => {
        if (explorer.isFolder) {
            setExpand(!expand);
        } else {
            onSelect(explorer);
        }
    };

    const handleClick = () => {
        if (explorer.isFolder) {
            onFolderClick(explorer);
        }
    };

    const renderIcon = () => {
        if (explorer.isFolder) {
            return expand ? <FaFolderOpen /> : <FaFolder />;
        } else if (explorer.type === 'image') {
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
                {renderIcon()} {explorer.name}
            </div>
            {expand && explorer.items && (
                <div className="innerFolderContainer">
                    {explorer.items.map((item: Item) => (
                        <Folder 
                            key={item.id} 
                            explorer={item} 
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