import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Aluno } from '../models/Aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  
  modalRef: BsModalRef = null;
  alunoForm: FormGroup;
  titulo = 'Alunos';
  alunoSelecionado: Aluno = null;

  alunos: Array<Aluno> = [];

  constructor(private fb: FormBuilder, private modalService: BsModalService, private alunoService: AlunoService) {
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(){
    this.alunoService.getAll().subscribe(
      (alunos: Aluno[]) => { this.alunos = alunos}, //ação em caso de sucesso
      (erro: any) => { console.error(erro); }
    );
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  //Esses comandos foram colocados no construtor devido a erros apontados pelo comp typescript
  criarForm(){
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSubmit(){
    console.log(this.alunoForm.value);
    this.salvarAluno(this.alunoForm.value);
  }

  salvarAluno(aluno: Aluno){
    console.log(aluno);
    if(aluno.id === 0) {
      console.log('chamou post');
      this.alunoService.post(aluno).subscribe(
        (retorno) => { 
          console.log(retorno); 
          this.carregarAlunos();
        },
        (erro: any) => { console.error(erro) }
      );
    } else {
      console.log('chamou put');
      this.alunoService.put(aluno.id, aluno).subscribe(
        (retorno) => { 
          console.log(retorno); 
          this.carregarAlunos();
        },
        (erro: any) => { console.error(erro) }
      );
    }
  }

  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  alunoNovo() {
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
  }

  deletarAluno(id: number) {
    this.alunoService.delete(id).subscribe(
      (model: any) => { 
        console.log(model); 
        this.carregarAlunos();
      },
      (erro: any) => { console.error(erro) }
    );
    this.voltar();
  }
  voltar() {
    this.alunoSelecionado = null;
  }

}
