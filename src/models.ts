import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsString } from "class-validator";

export class SentimentRequest {
    @IsString()
    @ApiProperty({ example: 'The cost of the car was very reasonable and I was very happy with the service.', description: 'Request/Text entered by used and sent to Prompt template.', required: true })
    readonly text: string;  
}
export class ChatRequest {
    @IsString()
    @ApiProperty({ example: 'chat message', description: 'Chat message', required: true })
    text: string;  

    @IsArray()
    @ApiProperty({ example: [], description: 'Chat history', required: true })
    history: Array<any>;      
}

export class ChatResponse {
    @IsString()
    @ApiProperty({ example: '0', description: 'Response from AI', required: true })
    text: string;  
}

export class SentimentOfferResponse {
    @IsString()
    @ApiProperty({ example: '0', description: 'Response from AI', required: true })
    sentiment: string;

    @IsString()
    @ApiProperty({ example: 'Free Upgrade', description: 'Unique Offer ID', required: true })
    offer: string;    
}

export class Offer {
    @IsString()
    @ApiProperty({ example: 'offer1', description: 'Offer ID', required: true })
    id: string;

    @ApiProperty({ example: 'Free Upgrade', description: 'Offer Name', required: true })
    @IsString()
    name: string;
    
    @IsString()
    @ApiProperty({ example: 'Free Upgrade for loyal customers', description: 'Offer Description', required: true })
    description: string;

    @IsString()
    @ApiProperty({ example: '/asset/offers/offer1.png', description: 'Offer Asset/Image', required: true })
    asset: string;

    @IsArray()
    @ApiProperty({ example: ['free', 'upgrade'], description: 'Offer Meatadat', required: true })
    metadata: string[];   
}

export class ChatCardOffer {
    @IsArray()
    @ApiProperty({ example: 'Offer ID!', description: 'Offer ID', required: true })
    generic: any;
}

export class GeneralStatus {
    @IsBoolean()
    @ApiProperty({ example: true, description: 'General status of execution', required: true })    
    status: boolean;

    @IsBoolean()
    @ApiProperty({ example: 'A description about the status', description: 'General status of execution', required: false })    
    message?: string;    
}