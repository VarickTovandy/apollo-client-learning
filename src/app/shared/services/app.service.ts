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

  getAllPromos(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          GetAllPromos {
            _id
            title
            sub_title
            description
            image_url
            status
          }
        }
      `,
      variables: {
        pagination: {
          limit: 10
        }
      }
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
      },
      // context: {
      //   headers: {
      //     Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ1MWQwMzVhNmFiODZmZWIxZmM0YjMiLCJlbWFpbCI6Impvc2h1YS5tZWx2aW5AemV0dGFieXRlLnNnIiwiaWF0IjoxNzEwNDg3NTQ4LCJleHAiOjE3MTA1NzM5NDh9.bj8PBesLANrOdF6Y4lC965yPJGem1O-zPhzLQtuHjvg`
      //   }
      // }
    });
  }
}
