import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private apollo: Apollo) { }

  getAllPromo() {

  }

  createPromo(promoInput: any): Observable<any> {
    const CREATE_PROMO_MUTATION = gql`
    mutation CreatePromo($promo_input: PromoInput) {
      CreatePromo(promo_input: $promo_input) {
        _id
        title
        sub_title
        description
        image_url
        status
      }
    }
  `;

    return this.apollo.mutate({
      mutation: CREATE_PROMO_MUTATION,
      variables: {
        promo_input: promoInput
      }
    });
  }

  updatePromo(promoId: string, promoInput: any): Observable<any> {
    const UPDATE_PROMO_MUTATION = gql`
      mutation UpdatePromo($id: ID!, $promoInput: PromoInput!) {
        UpdatePromo(_id: $id, promo_input: $promoInput) {
          _id
          title
          sub_title
          description
          image_url
          status
        }
      }
    `;

    return this.apollo.mutate({
      mutation: UPDATE_PROMO_MUTATION,
      variables: {
        id: promoId,
        promoInput: promoInput
      }
    });
  }

  deletePromo(promoId: string) {
    const DELETE_PROMO_MUTATION = gql`
    mutation DeletePromo($id: ID!) {
      DeletePromo(_id: $id) {
        _id
      }
    }
  `;

    return this.apollo.mutate({
      mutation: DELETE_PROMO_MUTATION,
      variables: {
        id: promoId
      },
    });
  }

  getPromoById(promoId: string): Observable<any> {
    const GET_PROMO_BY_ID_QUERY = gql`
      query GetPromoById($_id: ID!) {
        GetOnePromo(_id: $_id) {
          _id
          title
          sub_title
          description
          image_url
          status
        }
      }
    `;

    return this.apollo.query({
      query: GET_PROMO_BY_ID_QUERY,
      variables: {
        _id: promoId
      },
      fetchPolicy: 'network-only'
    });
  }
}
