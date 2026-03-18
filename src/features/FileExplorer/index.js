import { useState } from "react";
import "./style.css";

const recurisiveFindAndUpdate = (fileList, id, callback) => {
  for (let i = 0; i < fileList.length; i++) {
    const fileObject = fileList[i];
    if (fileObject.id === id) {
      callback(fileObject, i, fileList);
      break;
    } else if (fileObject.children) {
      recurisiveFindAndUpdate(fileObject.children, id, callback);
    }
  }
};

const recurisiveFindAndDelete = (fileList, id) => {
  for (let i = 0; i < fileList.length; i++) {
    const fileObject = fileList[i];
    if (fileObject.id === id) {
      fileList.splice(i, 1);
      break;
    } else if (fileObject.children) {
      recurisiveFindAndDelete(fileObject.children, id);
    }
  }
};

const recurisiveFindAndAddFile = (fileList, id, newFileName) => {
  const newId = Math.random().toString(36).substring(2, 9);
  const newFileObject = { id: newId, name: newFileName };
  for (let i = 0; i < fileList.length; i++) {
    const fileObject = fileList[i];
    if (fileObject.id === id) {
      fileObject.children = [...(fileObject.children || []), newFileObject];
      break;
    } else if (fileObject.children) {
      recurisiveFindAndAddFile(fileObject.children, id, newFileObject);
    }
  }
};

const recurisiveFindAndAddDirectory = (fileList, id, newDirectoryName) => {
  const newId = Math.random().toString(36).substring(2, 9);
  const newDirectoryObject = {
    id: newId,
    name: newDirectoryName,
    children: [],
  };
  for (let i = 0; i < fileList.length; i++) {
    const fileObject = fileList[i];
    if (fileObject.id === id) {
      fileObject.children = [
        ...(fileObject.children || []),
        newDirectoryObject,
      ];
      break;
    } else if (fileObject.children) {
      recurisiveFindAndAddDirectory(
        fileObject.children,
        id,
        newDirectoryObject,
      );
    }
  }
};

function Actions({ fileObject, originalFileList, setDataFileList }) {
  const { children } = fileObject;
  const isDirectory = Boolean(children);

  const handleEdit = () => {
    console.log("editing file object", fileObject.name);
    const id = fileObject.id;
    const copyFileList = [...originalFileList];
    recurisiveFindAndUpdate(copyFileList, id, (fileObject) => {
      fileObject.name =
        prompt("Enter new name", fileObject.name) || fileObject.name;
    });
    setDataFileList(copyFileList);
  };

  const handleDelete = () => {
    const id = fileObject.id;
    const copyFileList = [...originalFileList];
    recurisiveFindAndDelete(copyFileList, id);
    setDataFileList(copyFileList);
  };

  const handleAddFile = () => {
    const id = fileObject.id;
    const copyFileList = [...originalFileList];
    const newFileName = prompt("Enter new file name");
    if (!newFileName) return;
    recurisiveFindAndAddFile(copyFileList, id, newFileName);
    setDataFileList(copyFileList);
  };

  const handleAddDirectory = () => {
    const id = fileObject.id;
    const copyFileList = [...originalFileList];
    const newDirectoryName = prompt("Enter new directory name");
    if (!newDirectoryName) return;
    recurisiveFindAndAddDirectory(copyFileList, id, newDirectoryName);
    setDataFileList(copyFileList);
  };

  return (
    <span>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {isDirectory && <button onClick={handleAddFile}>Add File</button>}
      {isDirectory && (
        <button onClick={handleAddDirectory}>Add Directory</button>
      )}
    </span>
  );
}

function FileObject({ fileObject, level, originalFileList, setDataFileList }) {
  const { name: fileName, children } = fileObject;
  const [expanded, setExpanded] = useState(false);
  const isDirectory = Boolean(children);

  console.log("rendering file object", fileName);

  const handleExpanded = () => {
    if (!isDirectory) return;
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="file-item-container ">
        <button
          onClick={handleExpanded}
          className={`file-item-button ${isDirectory && "file-item-button--directory"}`}
        >
          <span>{fileName}</span> {isDirectory && <>[{expanded ? "-" : "+"}]</>}
        </button>
        <span className="action-button-container">
          <Actions
            fileObject={fileObject}
            originalFileList={originalFileList}
            setDataFileList={setDataFileList}
          />
        </span>
      </div>

      {expanded && children && (
        <FileList
          fileList={children}
          level={level + 1}
          originalFileList={originalFileList}
          setDataFileList={setDataFileList}
        />
      )}
    </div>
  );
}

function FileList({ fileList, level = 0, originalFileList, setDataFileList }) {
  const directories = fileList.filter((fileItem) => fileItem.children);
  const nonDirectories = fileList.filter((fileItem) => !fileItem.children);

  directories.sort((a, b) => a.name.localeCompare(b.name));
  nonDirectories.sort((a, b) => a.name.localeCompare(b.name));

  const items = [...directories, ...nonDirectories];
  return (
    <div style={{ marginLeft: 15 }}>
      {items.map((fileObject, index) => {
        return (
          <FileObject
            fileObject={fileObject}
            key={index}
            level={level + 1}
            originalFileList={originalFileList}
            setDataFileList={setDataFileList}
          />
        );
      })}
    </div>
  );
}

export default function FileExplorer({ data, setData }) {
  return (
    <div>
      <FileList
        fileList={data}
        level={0}
        originalFileList={data}
        setDataFileList={setData}
      />
    </div>
  );
}
