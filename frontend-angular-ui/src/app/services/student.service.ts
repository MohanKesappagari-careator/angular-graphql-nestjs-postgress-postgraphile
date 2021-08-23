import { Injectable } from '@angular/core';
import { Observable } from '@apollo/client/utilities';
import { gql } from 'apollo-angular';
import { GraphQLClient, request } from 'graphql-request';

const UPLOADFILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
const endpoint = 'backend-bulljs';
const graphQLClient = new GraphQLClient(endpoint, {
  credentials: 'include',
  mode: 'cors',
});

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor() {}
  uploadFile(file: any) {
    return request(endpoint, UPLOADFILE, {
      file: file,
    });
  }
}
