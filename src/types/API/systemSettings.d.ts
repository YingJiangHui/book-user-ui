namespace API {
  namespace SystemSetting {
    type Instance = {
      id: string;
      name: string;
      value: string;
      description: string;
    };

    type Map = {
      //    最大借阅数量
      MAX_BORROW_SIZE: number;
      //    违约上限次数
      MAX_OVERDUE_TIMES: number;
      //    默认借阅天数
      DEFAULT_BORROW_DAYS: number;
      //    最大借阅天数
      MAX_BORROW_DAYS: number;
      //    验证码有效时间
      CAPTCHA_EXPIRE_TIME: number;
      //    邀请码有效时间
      INVITATION_EXPIRE_TIME: number;
      //    邀请注册地址
      INVITATION_URL: string;
      //    token过期时间
      TOKEN_EXPIRATION: number;
      //    取书天数
      GET_BOOK_DAYS: number;
    };
  }
}
