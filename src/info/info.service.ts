import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import util from 'util';
import { createRequire } from 'module';
import { cwd } from 'process';
import { join } from 'path';
import { exec } from 'child_process';

@Injectable()
export class InfoService {
  constructor(private prisma: PrismaService) {}

  async infoById(userId: string): Promise<UserIdInfo> {
    try {
      const userIdInfo = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, id_type: true },
      });
      return userIdInfo;
    } catch (error) {
      return null;
    }
  }

  async latencyInfo(): Promise<string> {
    try {
      const lacety: Promise<string> = new Promise((res, rej) => {
        exec(`ping -c 5 ${process.env.PING_HOST}`, (error, stdout, stderr) => {
          if (error) {
            rej(error);
            return;
          }
          if (stdout) {
            res(stdout);
          } else if (stderr) {
            rej(stderr);
          }
        });
      });
      const resalt = await lacety;

      return resalt;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
