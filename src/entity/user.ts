import { Entity, Column, PrimaryColumn } from 'typeorm'
import { Length, IsEmail } from 'class-validator'

@Entity()
export class User {
  @PrimaryColumn()
  id!: number

  @Column({ length: 80 })
  @Length(10, 80)
  name!: string

  @Column({ length: 100 })
  @Length(10, 100)
  @IsEmail()
  email!: string
}

export const UserSchema = {
  id: {
    type: 'number',
    required: true,
    example: 1,
  },
  name: {
    type: 'string',
    required: true,
    example: 'dmoosocool',
  },
  email: {
    type: 'string',
    required: true,
    example: 'dmoosocool@gmail.com',
  },
}
