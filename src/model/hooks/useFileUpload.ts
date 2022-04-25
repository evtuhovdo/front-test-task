import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { upload, uploadVariables } from './__generated__/upload';

const UPLOAD_FILE_MUTATION = gql`
    mutation upload($file: Upload!) {
        upload(file: $file) {
            data {
                id
                attributes {
                    url
                    formats
                }
            }
        }
    }
`;

const useFileUpload = () => {
  const [ uploadFileMutation ] = useMutation<upload, uploadVariables>(UPLOAD_FILE_MUTATION);

  return useCallback(async (file) => {
    return uploadFileMutation({
      variables: {
        file,
      },
    });
  }, [ uploadFileMutation ]);
};

export default useFileUpload;
