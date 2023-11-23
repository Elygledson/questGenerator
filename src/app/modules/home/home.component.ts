import { Component } from '@angular/core';
import { Question } from '../view-questions/interfaces/question.interface';
import { Level } from './interfaces/level.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  form!: FormGroup;
  level = Level;
  loading = false;

  options: AnimationOptions = {
    path: '/assets/lottie/handwriting.json',
  };

  capacities: string[] = [
    'Utilizar aplicações e sistemas operacional no desenvolvimento da documentação de sistemas web.',
    'Compreender fundamentos de UI e UX para o desenvolvimento de interfaces amigáveis ao usuário.',
    'Aplicar lógica de programação na resolução de problemas computacionais.',
    'Diferenciar metodologias de desenvolvimento de projetos de acordo com a característica da aplicação web.',
    'Utilizar marcações, estilização e programação client-side para o desenvolvimento de interfaces para a web.',
    'Desenvolver o back-end de aplicações web por meio de linguagem de programação.',
    'Considerando a linguagem de programação na codificação de sistemas para internet',
  ];

  knowledges: string[] = [
    'Fundamentos de hardware e software',
    'Software de escritório',
    'Metodologias de versionamento',
    'Princípios de UI e UX na produção de interfaces',
    'Princípios de design',
    'Abstração lógica e algebra booleana',
    'Pseudocódigo',
    'Algoritmos de busca e ordenação',
    'Metodologias de desenvolvimento tradicionais e ágeis',
    'Interação com APIs',
  ];

  standards: string[] = [
    'Considerando técnicas de levantamento dos requisitos da aplicação',
    'Considerando a linguagem de programação na codificação de sistemas para internet',
  ];

  functions: string[] = [
    'Produzir Interfaces para internet, de acordo com metodologia e padrões de qualidade, usabilidade, interatividade, robustez, acessibilidade e segurança da informação.',
  ];

  subfunctions: string[] = [
    'Projetar interfaces para atender o escopo do projeto',
    'Codificar interfaces para arquitetura client-side',
    'Testar interfaces para garantia da qualidade da emtrega',
    'Realizar interação com banco de dados',
    'Codificar sistemas para arquitetura server-side',
  ];

  questions: Question[] = [
    {
      context: '',
      question:
        'Qual país foi invadido primeiro durante a Segunda Guerra Mundial?',
      options: ['França', 'Polônia', 'Inglaterra', 'Rússia'],
      answer: 'Polônia',
      justifications: [],
    },
    {
      context: '',
      question:
        'Quem foi o líder da Alemanha durante a Segunda Guerra Mundial?',
      options: [
        'Winston Churchill',
        'Adolf Hitler',
        'Joseph Stalin',
        'Benito Mussolini',
      ],
      answer: 'Adolf Hitler',
      justifications: [],
    },
    {
      context: '',
      question: 'Em que ano começou a Segunda Guerra Mundial?',
      options: ['1935', '1938', '1939', '1941'],
      answer: '1939',
      justifications: [],
    },
    {
      context: '',
      question: 'Qual foi a operação aliada que marcou o Dia D?',
      options: [
        'Operação Barbarossa',
        'Operação Overlord',
        'Operação Market Garden',
        'Operação Torch',
      ],
      answer: 'Operação Overlord',
      justifications: [],
    },
  ];

  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      type: new FormControl('multiple_choice', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      knowledge: new FormControl('', [Validators.required]),
      function: new FormControl('', Validators.required),
      subfunction: new FormControl('', Validators.required),
      context: new FormControl(''),
      num_options: new FormControl(),
    });
  }

  onAnimate(animationItem: AnimationItem): void {
    const questionType: string = this.form.get('type')?.value;
    if (questionType.startsWith('multiple'))
      this.form
        .get('num_options')
        ?.setValue(
          this.form.get('type')?.value === 'multiple_choice_4'
            ? 'Quatro'
            : 'Cinco'
        );

    this.form
      .get('type')
      ?.setValue(
        this.form.get('type')?.value !== 'boolean'
          ? 'multiple_choice'
          : 'boolean'
      );
    this.http
      .post(`${environment.api}/text/questions`, {
        ...this.form.value,
      })
      .subscribe((response: any) => {
        this.questions = response;
        const card = document.getElementById('card-question');
        if (card)
          card.scrollIntoView({
            behavior: 'smooth',
          });
        this.loading = false;
      });
  }

  generate(): void {
    this.loading = true;
  }
}
