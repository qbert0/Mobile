'use client';

import {
  MultiImageDropzone,
  type FileState,
} from '../uploadfile/mutilImage';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import { Button } from '../ui/button';
import { map } from 'zod';

interface Props {
  upload : (url : string[]) => void
}

export function MultiImageDropzoneUsage({upload} : Props) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [my, setMy] = useState<FileState>()
  const [url, setUrl] = useState<string[]>([])

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const uploadImage = async () => {
    if( my != undefined ) {
      // updateFileProgress(my.key, 'COMPLETE')
      upload(url)
    }
    // console.log(url)
  }

  const setUrlFor = (data : string) => {
    const updateUrl = url
    // console.log(data)
    updateUrl.push(data)
    // console.log(updateUrl)
    setUrl(updateUrl)
    // console.log(url)
    // console.log(1)
  }

  return (
    <div>
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
        }}
        onChange={(files) => {
          setFileStates(files);
          setMy(undefined)
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      setMy(addedFileState)
                      // updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                // console.log(res);
                setUrlFor(res.url)
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
     <Button disabled={my === undefined} onClick={() => uploadImage()}>
        Gửi
      </Button>
    </div>
  );
}