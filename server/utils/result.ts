import type { NodeEventContext } from 'h3';
export class useResult {
  private static res: NodeEventContext['res'];
  constructor(protected event: { node: { res: NodeEventContext['res'] } }) {
    useResult.res = event.node.res;
  }

  public result(data: any, message: string = 'success', code: number = 200) {
    useResult.res.statusCode = code;
    return {
      code,
      message,
      data
    };
  }
}
