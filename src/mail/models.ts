import { ApiProperty } from "@dataui/crud/lib/crud";
import { IsEmail, IsString } from "class-validator";

export class MailRequest {
    @IsEmail()
    @ApiProperty({ example: 'someemail@test.com', description: 'Email Address', required: true })
    email: string;  

    @IsString()
    @ApiProperty({ example: 'This is confirmation email!', description: 'Subject of email', required: true })
    subject: string;  

    @IsString()
    @ApiProperty({ example: 'This is test email', description: 'Content of email', required: true })
    text: string;    
    
    @IsString()
    @ApiProperty({ example: '<p>This is test email in HTML format</p>', description: 'Content of email', required: false })
    html: string;       
}