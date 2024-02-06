import { Injectable } from '@angular/core';
import { Firestore, collectionData, doc, docData, query, where } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private fs: Firestore) { }

  /**
   * Devuelve una colección entera
   * @param coleccion Nombre de la coleccion a devolver.
   * @returns Devuelve un Observable de tipo any[]
   */
  getCollection(coleccion: string){
    const collectionRef = collection(this.fs, coleccion);
    return collectionData(collectionRef, {idField: "id"}) as Observable<any[]>;
  }

  /**
   * Devuelve un documento por su id
   * @param id Id del documento a devolver.
   * @param coleccion Nombre de la colección.
   * @returns Devuelve un Observable de tipo any
   */
  getDocumentById(id: string, coleccion: string){
    const documentRef = doc(this.fs, coleccion + "/" + id);
    return docData(documentRef, {idField: "id"}) as Observable<any>;
  }

  /**
   * Devuelve el resultado de una consulta simple
   * @param coleccion Nombre de la coleccion
   * @param campo Campo por el que cual se va a filtrar
   * @param valor Valor por el cual filtrar
   * @returns Devuelve un Observable de tipo any[]
   */
  queryCollection(coleccion: string, campo: string, valor: string){
    const collectionRef = collection(this.fs, coleccion);
    const queryRef = query(collectionRef, where(campo, "==", valor));
    return collectionData(queryRef, {idField: "id"}) as Observable<any[]>;
  }

  /**
   * Crea un nuevo documento
   * @param objeto Objeto que se va a agregar
   * @param coleccion Nombre de la colección donde se agregará el objeto
   * @returns Devuelve una promesa de tipo any
   */
  newDocument(objeto: any, coleccion: string){
    const collectionRef = collection(this.fs, coleccion);
    return addDoc(collectionRef, objeto) as Promise<any>;
  }

  /**
   * Actualiza un documento
   * @param objeto Objeto para actualizar
   * @param coleccion Nombre de la colección donde se realizará el update
   * @returns Devuelve una promesa de tipo any
   */
  updateDocument(objeto: any, coleccion: string){
    const documentRef = doc(this.fs, coleccion+  "/" + objeto.id);
    return updateDoc(documentRef, objeto); // Devuelve una promesa
  }

  /**
   * Borra un documento
   * @param id Id del documento que queremos borrar
   * @param coleccion Nombre de la colección
   * @returns Devuelve una promesa de tipo any
   */
  deleteDocument(id: string, coleccion: string){
    const documentRef = doc(this.fs, coleccion+  "/" + id);
    return deleteDoc(documentRef);
  }
}
