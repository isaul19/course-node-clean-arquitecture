import express, { Router } from "express";
import compression from "compression";

interface Options {
  port: number;
  public_path: string;
  routes: Router;
}

export class Server {
  private app;

  constructor(private readonly options: Options) {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // this.app.use(express.static(this.options.PUBLIC_PATH));
    // this.app.use(this.routes);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
  }

  routes() {
    this.app.use(this.options.routes);
  }

  start() {
    this.app.listen(this.options.port, () => {
      console.log(`Server running in ${this.options.port}`);
    });
  }
}
