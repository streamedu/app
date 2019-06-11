import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface, Roles } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminUserServiceService {

  constructor( private afs:AngularFirestore) { 
    this.usersCollection = afs.collection<UserInterface>('users');
    this.users = this.usersCollection.valueChanges();
  }

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  private users: Observable<UserInterface[]>;
  private userDoc: AngularFirestoreDocument<UserInterface>;
  private user: Observable<UserInterface>;
  public selectedUser: UserInterface = {
    id: null,
  };
  // public selectedUser: any[] = [];

  getAllUsers(){
    return this.users = this.usersCollection.snapshotChanges()
    .pipe(map (changes => {
      return changes.map (action => {
        const data = action.payload.doc.data() as UserInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getOneUser(idUser: string) {
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    return this.user = this.userDoc.snapshotChanges().pipe(map ( action  => {
      if (action.payload.exists === false){
        return null;
      }else {
        const data = action.payload.data() as UserInterface;
        data.id = action.payload.id;
        return data; 
      }
    }));

  }
  updateUser(user: UserInterface): void{
   // console.log('el user recibido para modificar es ',user);
    let idUser = user.id;
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    this.userDoc.update(user);
  }
  deleteUser( idUser: string): void {
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    this.userDoc.delete();
  }
}
