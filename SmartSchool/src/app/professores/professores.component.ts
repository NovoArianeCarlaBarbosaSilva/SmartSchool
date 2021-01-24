import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/Professor';
import { ProfessorService } from './professor.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  modalRef: BsModalRef;
  titulo = 'Professores';
  profSelecionado: Professor = null;
  professorForm: FormGroup;

  public professores: Array<Professor> = []

  constructor(private fb: FormBuilder, private modalService: BsModalService, private professorService: ProfessorService) {
    this.professorForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      disciplina: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.carregarProfessores();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  profSelect(professor: Professor) {
    this.profSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  professorNovo() {
    this.profSelecionado = new Professor();
    this.professorForm.patchValue(this.profSelecionado);
  }

  voltar() {
    this.profSelecionado = null;
  }

  carregarProfessores(){
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => { this.professores = professores; console.log(this.professores) },
      (erro: any) => { console.error(erro); }
    );
  }

  professorSubmit(){
    console.log(this.professorForm.value);
    this.salvarProfessor(this.professorForm.value);
  }

  salvarProfessor(professor: Professor){
    if(professor.id === 0) {
      this.professorService.post(professor).subscribe(
        (retorno) => { 
          console.log(retorno); 
          this.carregarProfessores();
        },
        (erro: any) => { console.error(erro) }
      );
    } else {
      this.professorService.put(professor.id, professor).subscribe(
        (retorno) => { 
          console.log(retorno); 
          this.carregarProfessores();
        },
        (erro: any) => { console.error(erro) }
      );
    }
  }

  deletarProfessor(id: number) {
    this.professorService.delete(id).subscribe(
      (model: any) => { 
        console.log(model); 
        this.carregarProfessores();
      },
      (erro: any) => { console.error(erro); this.carregarProfessores(); }
    );
  }

}
