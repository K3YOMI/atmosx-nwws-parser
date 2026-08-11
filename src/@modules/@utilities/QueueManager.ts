/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: http://localhost/documentation | https://atmosphericx.scriptkitty.cafe/documentation

    Internal Package: @atmosx/event-product-parser
*/

export type QueueTask = () => Promise<void>;

export interface QueueManagerOptions {
    concurrency?: number;
    onError?: (error: unknown) => void;
}

export class QueueManager {
    private readonly queue: QueueTask[] = [];
    private readonly concurrency: number;
    private readonly onError: (error: unknown) => void;

    private running = 0;
    private draining = false;

    public constructor(options: QueueManagerOptions = {}) {
        const concurrency = options.concurrency ?? 1;
        this.concurrency = concurrency;
        this.onError = options.onError ?? ((error) => {
            console.error("[QueueManager] Task failed:", error);
        });
    }

    public enqueue(task: QueueTask): void {
        this.queue.push(task);
        this.drain();
    }

    private drain(): void {
        if (this.draining) { return; }
        this.draining = true;
        while (this.running < this.concurrency && this.queue.length > 0) {
            const task = this.queue.shift();
            if (!task) { continue; }
            this.running++;
            void this.execute(task);
        }
        this.draining = false;
    }

    private async execute(task: QueueTask): Promise<void> {
        try {
            await task();
        } catch (error) {
            try {
                this.onError(error);
            } catch (handlerError) {}
        } finally {
            this.running--;
            this.drain();
        }
    }
}