import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Aluno } from '../models/Aluno';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  
  modalRef: BsModalRef;
  alunoForm: FormGroup;
  titulo = 'Alunos';
  alunoSelecionado: Aluno = new Aluno();

  alunos: Array<Aluno> = [
    {id: 1,nome: 'Marta', sobrenome: 'Rocha Andrade', telefone: '9107-0123' },
    {id: 2,nome: 'Paula', sobrenome: 'Burlamachi', telefone: '3332-5555' },
    {id: 3,nome: 'Jennifer', sobrenome: 'Lopes', telefone: '2345-6789' },
    {id: 4,nome: 'Paulo', sobrenome: 'Cabral', telefone: '3332-9999' },
    {id: 5,nome: 'Juarez', sobrenome: 'Amaral', telefone: '98768-9876' },
    {id: 6,nome: 'Gustavo', sobrenome: 'Pontes', telefone: '99999-9999' },
    {id: 7,nome: 'Pedro', sobrenome: 'Paulo Rangel', telefone: '91919-1919' },
  ];

  constructor(private fb: FormBuilder, private modalService: BsModalService) {
    this.alunoForm = this.fb.group({
      nome: [''],
      sobrenome: [''],
      telefone: ['']
    });
  }
  
  ngOnInit(): void {
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  criarForm(){
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  alunoSubmit(){
    console.log(this.alunoForm.value);
  }

  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  voltar() {
    this.alunoSelecionado = new Aluno();
  }

}
