import { Livro } from './../livro.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  id_cat: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nomeAutor: '',
    texto: ''
  }

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  delete(): void {
    this.service.delete(this.livro.id!).subscribe(() => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro deletado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Falha ao deletar livro! Tente novamente mais tarde!')
    })
  }

}
