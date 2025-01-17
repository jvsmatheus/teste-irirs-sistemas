import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/User';
import { MatDialog } from '@angular/material/dialog';

interface Form {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  age: FormControl<number | null>;
}

@Component({
  selector: 'app-create',
  standalone: false,
  
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  @Input() is_edit?: boolean;
  @Output() formSubmittedEvent = new EventEmitter<void>();

  form!: FormGroup<Form>;

  constructor(private user_service: UserService) {
    this.form = new FormGroup<Form>({
      name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      age: new FormControl<number | null>(null, [Validators.min(18)]),
    });
    console.log(this.is_edit);
  }

  save() {
    let form_value = this.form.value;

    const cleaned_value = {
      name: form_value.name || '', // Converte null para string vazia
      email: form_value.email || '',
      age: form_value.age || 0, // Converte null para 0 ou outro valor padrão
    };

    this.user_service.createUser(cleaned_value).subscribe(
      (data) => {
        console.log(data);
        this.formSubmittedEvent.emit();
      }
    )
  }
}
