// swagger 文档
defineRouteMeta({
  openAPI: {
    description: '图片上传',
    summary: '图片上传',
    tags: ['图片上传'],
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: {
                description: '上传的图片文件',
                type: 'string',
                format: 'binary'
              }
            },
            required: ['file']
          }
        }
      },
      required: true
    },
    responses: {
      200: {
        description: '上传成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'number',
                  description: '状态码',
                  default: 200
                },
                message: {
                  type: 'string',
                  description: '状态信息'
                },
                data: {
                  type: 'object',
                  description: '文件信息',
                  properties: {
                    name: {
                      type: 'string',
                      description: '文件名'
                    },
                    type: {
                      type: 'string',
                      description: '文件类型'
                    },
                    size: {
                      type: 'number',
                      description: '文件大小(字节)'
                    },
                    url: {
                      type: 'string',
                      description: '文件访问地址'
                    }
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: '请求参数错误',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'number',
                  description: '状态码',
                  default: 400
                },
                message: {
                  type: 'string',
                  description: '错误信息'
                },
                data: {
                  type: 'null',
                  description: '数据',
                  default: null
                }
              }
            }
          }
        }
      },
      413: {
        description: '文件过大',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'number',
                  description: '状态码',
                  default: 413
                },
                message: {
                  type: 'string',
                  description: '错误信息'
                },
                data: {
                  type: 'null',
                  description: '数据',
                  default: null
                }
              }
            }
          }
        }
      },
      500: {
        description: '服务器内部错误',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'number',
                  description: '状态码',
                  default: 500
                },
                message: {
                  type: 'string',
                  description: '错误信息'
                },
                data: {
                  type: 'null',
                  description: '数据',
                  default: null
                }
              }
            }
          }
        }
      }
    }
  }
});

export default defineEventHandler(async event => {
  const { result } = new useResult(event);

  try {
    // 获取上传文件
    const files = await readMultipartFormData(event);
    if (!files) {
      return result(null, '请上传文件', 400);
    }

    const file = files[0];

    // 检查文件名
    if (!file.name) {
      return result(null, '文件名不能为空', 400);
    }

    // 只允许上传图片
    if (file.type?.startsWith('image/') !== true) {
      return result(null, '请上传有效的图片文件', 400);
    }

    // 检查文件大小 (5MB限制)
    if (file.data.length > 5 * 1024 * 1024) {
      return result(null, '文件大小不能超过5MB', 413);
    }

    // 将文件数据转换为Base64编码
    const base64Data = Buffer.from(file.data).toString('base64');
    const base64Url = `data:${file.type};base64,${base64Data}`;

    // 在实际应用中，这里应该保存文件到存储系统
    // 为演示目的，我们只返回文件信息和Base64 URL
    return result(
      {
        name: file.name,
        type: file.type,
        size: file.data.length,
        url: base64Url
      },
      '上传成功',
      200
    );
  } catch (error: any) {
    // 处理服务器内部错误
    return result(null, '服务器内部错误，请稍后重试', 500);
  }
});
