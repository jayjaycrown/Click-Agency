import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent implements OnInit {
  mailTemplate = [
    { title: 'Test Mail', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit repellendus sunt totam voluptas suscipit fugiat. Labore ipsum blanditiis minima, quaerat nisi cumque expedita quos? Voluptatibus quam corrupti, quia rem, odit impedit natus, officiis beatae alias optio facilis soluta asperiores recusandae veniam dolorum excepturi perspiciatis. Sit quibusdam ea odit ipsum cum.' },
    { title: 'Double test mail', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit repellendus sunt totam voluptas suscipit fugiat.Officiis beatae alias optio facilis soluta asperiores recusandae veniam dolorum excepturi perspiciatis. Sit quibusdam ea odit ipsum cum.' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
