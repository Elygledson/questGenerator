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
    'C2 - Compreender fundamentos de UI e UX para o desenvolvimento de interfaces amigáveis ao usuário',
    'C3 - Aplicar lógica de programação na resolução de problemas computacionais',
    'C4 - Diferenciar metodologias de desenvolvimento de projetos de acordo com a característica da aplicação web.',
    'C5 - Utilizar marcação, estilização e programação client-side para o desenvolvimento de interfaces para a web e comunicação com APIs.',
    'C6 - Desenvolver o back-end de aplicações web por meio de linguagem de programação.',
  ];

  knowledges: string[] = [
    'Princípios de UI e UX na produção de interfaces e princípios de design',
    'Abstração lógica e álgebra booleana e pseudocódigo',
    'Linguagem de marcação, folha de estilo e linguagem de script',
    'Planejamento e documentação de testes e 22 - Tipos, níveis e técnicas de teste',
    'Modelo conceitual, lógico e físico de banco de dados, linguagens DDL e DML e padronização e normalização de dados',
    'Estruturas de dados (vetores, matrizes, pilhas, filas, listas) e algoritmos de busca e ordenação',
    'Metodologias de desenvolvimento tradicionais e ágeis',
    'Metodologias de versionamento e linguagem de programação server-side',
    'Planejamento e documentação de testes e tipos, níveis e técnicas de teste',
    'Fundamentos de hardware e software',
    'Parametrização de sistemas web',
    'Softwares de escritório',
    'Princípios de UI e UX na produção de interfaces e princípios de design',
    'Interação com APIs',
    'Desenvolvimento de APIs',
  ];

  standards: string[] = [
    'Considerando técnicas de levantamento dos requisitos da aplicação',
    'Considerando a linguagem de programação na codificação de sistemas para internet',
  ];

  functions: string[] = [
    '1 - Produzir Interfaces para internet, de acordo com metodologia e padrões de qualidade, usabilidade, interatividade, robustez, acessibilidade e segurança da informação.',
    '2 - Desenvolver sistemas para internet, de acordo com metodologia e padrões de qualidade, usabilidade, interatividade, robustez, acessibilidade e segurança da informação.',
  ];

  subfunctions: string[] = [
    '1.1 - Projetar interfaces para atender o escopo do projeto',
    '1.2 - Codificar interfaces para arquitetura client-side',
    '1.3 - Testar interfaces para garantia da qualidade da entrega',
    '2.1 – Realizar interação com banco de dados',
    '2.2 – Codificar sistemas para arquitetura server-side',
    '2.3 – Testar sistemas para garantia da qualidade da entrega',
    '2.4 – Implantar sistemas para internet',
    '2.5 – Manter sistemas para internet',
    '2.6 – Integrar interfaces com a arquitetura server-side.',
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

  selectFunction(event: any): void {
    if (this.form.get('function')?.value.startsWith('1')) {
      this.subfunctions = [
        '1.1 - Projetar interfaces para atender o escopo do projeto',
        '1.2 - Codificar interfaces para arquitetura client-side',
        '1.3 - Testar interfaces para garantia da qualidade da entrega',
      ];
    } else {
      this.subfunctions = [
        '2.1 – Realizar interação com banco de dados',
        '2.2 – Codificar sistemas para arquitetura server-side',
        '2.3 – Testar sistemas para garantia da qualidade da entrega',
        '2.4 – Implantar sistemas para internet',
        '2.5 – Manter sistemas para internet',
        '2.6 – Integrar interfaces com a arquitetura server-side.',
      ];
    }
  }

  generate(): void {
    this.loading = true;
  }
}
