import { Component } from '@angular/core';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title: string = '';
  content: string = '';
  category: string = '';
  notes: any[] = [];
  constructor(private noteService: NoteService) {}
  ngOnInit() {
    // Ao inicializar, vamos carregar as notas
    this.loadNotes();
  }

  
  createNote() {
    if (this.title && this.content) {
      this.noteService.createNote(this.title, this.content).subscribe(
        (response: any) => {
          console.log('Nota salva com sucesso:', response);
          // Aqui você pode adicionar código para exibir uma mensagem de sucesso
          if (response.mensagem) {
            alert(response.mensagem); // Mensagem de sucesso
          }
          this.loadNotes(); // Supondo que você tenha o método loadNotes
          // Limpa os campos
          this.title = '';
          this.content = '';
        },
        (error: any) => {
          console.error('Erro ao salvar a nota:', error);
          alert('Ocorreu um erro ao tentar salvar a nota. Tente novamente.');
        }
      );
    } else {
      alert('Por favor, preencha o título e o conteúdo da nota.');
    }
  }
  loadNotes() {
    this.noteService.getNotes().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.notes = response; 
          console.log('um array foi usado',response); // Só atribui se for um array
        } else {
          console.error('A resposta não é um array:', response);
        }
      },
      (error: any) => {
        console.error('Erro ao carregar as notas:', error);
      }
    );
  }
  
}
