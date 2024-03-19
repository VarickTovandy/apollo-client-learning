import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'https://api.features.zetta-staging.work/graphql';

  constructor(private http: HttpClient, private apollo: Apollo) { }

  getAllPromos(page: number, pageSize: number): Observable<any> {
    return this.apollo.query({
      query: gql`
        query GetAllPromos($page: Int!, $pageSize: Int!) {
          GetAllPromos(pagination: { page: $page, limit: $pageSize }) {
            _id
            title
            sub_title
            description
            image_url
            status
            count_document
          }
        }
      `,
      variables: {
        page,
        pageSize
      },
      fetchPolicy: 'network-only'
    });
  }

  getUsers(lastName: string, pagination: any): Observable<any> {
    return this.apollo.query({
      query: gql`
        query getUsers($last_name: String, $pagination: PaginationInput) {
          GetAllUsers(last_name: $last_name, pagination: $pagination) {
            first_name
            last_name
            civility
            count_document
          }
        }
      `,
      variables: {
        last_name: lastName,
        pagination: pagination
      },
    });
  }

  getSchools(pagination: any): Observable<any> {
    return this.apollo.query({
      query: gql`
        query getSchools($pagination: PaginationInput) {
          GetAllSchools(pagination: $pagination) {
            short_name
            long_name
            status
            count_document
          }
        }
      `,
      variables: {
        pagination: pagination
      }
    });
  }
}
