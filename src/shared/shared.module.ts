import { Module, Global, HttpModule } from '@nestjs/common';

import { ConfigService } from './services';

const providers = [ConfigService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
