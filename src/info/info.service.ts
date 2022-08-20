import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { exec } from 'child_process';
import * as ping from 'ping';

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
      console.log(error);
      return null;
    }
  }

  async pingInfo(): Promise<string> {
    try {
      const lacety: Promise<string> = new Promise((res, rej) => {
        exec(
          `ping -c ${process.env.PING_NUMBER} ${process.env.PING_HOST}`,
          (error, stdout, stderr) => {
            if (error) {
              rej(error);
              return;
            }
            if (stdout) {
              res(stdout);
            } else if (stderr) {
              rej(stderr);
            }
          },
        );
      });
      const resalt = await lacety;

      return resalt;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async latencyInfo(): Promise<Latency> {
    try {
      const promisePingInfo: Promise<ping.PingResponse> = ping.promise.probe(
        process.env.PING_HOST,
      );
      const pingInfo = await promisePingInfo;
      const latencyInfo = { latency: pingInfo.avg };
      return latencyInfo;
    } catch (error) {
      console.log(error);
      console.log(error);
      return null;
    }
  }
}
