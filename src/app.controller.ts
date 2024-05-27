import { Body, Controller,  Get,  HttpCode, HttpStatus, Param, Post, Redirect } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Offer, SentimentOfferResponse, ChatResponse, ChatRequest, SentimentRequest } from './models';
import { GoogleAIService } from './google-ai.service';

@Controller()
@ApiTags('Google Gemini - GenAI')
export class AppController {
  constructor(private readonly googleService: GoogleAIService) {}

  @Get('/')
  @Redirect('/site', 301)
  @ApiOperation({summary: 'Redirect to deafutlt site'})
  async redirectToSite() {
    return { url: '/site' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/chat')
  @ApiOperation({summary: 'Chat with google gemeni'})
  @ApiResponse({ status: 200, description: 'Success', type:  ChatResponse})
  async chat(@Body() req: ChatRequest): Promise<ChatResponse> {
    return this.googleService.chat(req.text, req.history);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/feedback')
  @ApiOperation({summary: 'provides sentiment analysis about customer feedback and suggest and offer'})
  @ApiResponse({ status: 200, description: 'Success', type:  SentimentOfferResponse})
  async submitFeedback(@Body() req: SentimentRequest): Promise<SentimentOfferResponse> {
    return this.googleService.getSentimentAndOffer(req.text);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/offer/:offerId')
  @ApiOperation({summary: 'get an offer based on sentiment'})
  @ApiResponse({ status: 200, description: 'Success', type:  Offer})
  async getOffer(@Param('offerId') offerId: string): Promise<Offer> {
    return this.googleService.getOfferDetail(offerId);
  }  
 
  @HttpCode(HttpStatus.OK)
  @Post('/sentiment')
  @ApiOperation({summary: 'get sentiment of user feedback'})
  @ApiResponse({ status: 200, description: 'Success', type:  ChatResponse})
  async getSentiment(@Body() req: SentimentRequest): Promise<ChatResponse> {
    return this.googleService.getSentiment(req.text);
  } 
 

  @HttpCode(HttpStatus.OK)
  @Post('/google/langchain/chat')
  @ApiOperation({summary: 'Chat with langchain'})
  @ApiResponse({ status: 200, description: 'Success', type:  ChatResponse})
  async googleChat(@Body() req: ChatRequest): Promise<ChatResponse> {
    return this.googleService.chat(req.text, req.history);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/google/function-calling/chat')
  @ApiOperation({summary: 'Call functions based on user need'})
  @ApiResponse({ status: 200, description: 'Success', type:  ChatResponse})
  async googleFunctionCallingChat(@Body() req: ChatRequest): Promise<ChatResponse> {
    return this.googleService.chatWithFunctionCalling(req.text, req.history);
  }  

}
