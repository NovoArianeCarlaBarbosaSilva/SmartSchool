import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/Professor';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit {

  modalRef: BsModalRef;
  titulo = 'Professores';
  profSelecionado: Professor = new Professor();

  public professores: Array<Professor> = [
    { id: 1, nome: 'Hegler Kelser', disciplina: 'Matemática' },
    { id: 2, nome: 'Raquel Mini', disciplina: 'Física' },
    { id: 3, nome: 'Max do Val', disciplina: 'Português' },
    { id: 4, nome: 'Mark Juno', disciplina: 'Inglês' },
    { id: 5, nome: 'Marco Aurélio', disciplina: 'Programação' },
  ]

  constructor(private modalService: BsModalService) {
    
   }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  profSelect(prof: Professor) {
    this.profSelecionado = prof;
  }

  voltar() {
    this.profSelecionado = new Professor();
  }

}
