import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pregunta } from '../models/pregunta';



@Injectable({
  providedIn: 'root'
})
export class FaqServiceService {

  constructor(private afs:AngularFirestore) { 

    this.faqsCollection = afs.collection<Pregunta>('faqs');
    this.faqs = this.faqsCollection.valueChanges();
  }

  private faqsCollection: AngularFirestoreCollection<Pregunta>;
  private faqs: Observable<Pregunta[]>;
  private faqDoc: AngularFirestoreDocument<Pregunta>;
  private faq: Observable<Pregunta>;
  public selectedFaq: Pregunta = {
    id: null
  };


  getAllFaqs(){
    return this.faqs = this.faqsCollection.snapshotChanges()
    .pipe(map (changes => {
      return changes.map (action => {
        const data = action.payload.doc.data() as Pregunta;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }
  getOneFaq(idFaq: string) {
    this.faqDoc = this.afs.doc<Pregunta>(`faqs/${idFaq}`);
    return this.faq = this.faqDoc.snapshotChanges().pipe(map ( action  => {
      if (action.payload.exists === false){
        return null;
      }else {
        const data = action.payload.data() as Pregunta;
        data.id = action.payload.id;
        return data; 
      }
    }));

  }
  addFaq(faq: Pregunta):void {
    this.faqsCollection.add(faq);
  }
  updateFaq(faq: Pregunta): void{
    //console.log('la pregunta recibida para modificar es ',faq);
    let idFaq = faq.id;
    this.faqDoc = this.afs.doc<Pregunta>(`faqs/${idFaq}`);
    this.faqDoc.update(faq);
  }
  deleteFaq( idFaq: string): void {
    this.faqDoc = this.afs.doc<Pregunta>(`faqs/${idFaq}`);
    this.faqDoc.delete();
  }
}



