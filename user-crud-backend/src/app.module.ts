import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sumitzecotok1:SpPbF6VqbmYUEXQP@cluster0.lng5v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
