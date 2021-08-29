import { CronTime } from "cron";

export function nextTime(crontab: string): string {
    let oncePos = 0;
    if (crontab.indexOf("once") !== -1) {
        let vals = crontab.split(" ");
        vals.forEach((val, index) => {
            if (val == "once") {
                oncePos = index;
            }
        });
        if (vals.length == 5) {
            oncePos++;
        }
    }
    let cron = new CronTime(crontab.replaceAll("once", "*"));
    if (oncePos) {
        switch (oncePos) {
            case 1: //每分钟
                return cron
                    .sendAt()
                    .add(1, "minute")
                    .format("YYYY-MM-DD HH:mm 每分钟运行一次");
            case 2: //每小时
                return cron
                    .sendAt()
                    .add(1, "hour")
                    .format("YYYY-MM-DD HH 每小时运行一次");
            case 3: //每天
                return cron.sendAt().add(1, "day").format("YYYY-MM-DD 每天运行一次");
            case 4: //每月
                return cron.sendAt().add(1, "month").format("YYYY-MM 每月运行一次");
            case 5: //每年
                return cron.sendAt().add(1, "year").format("YYYY 每年运行一次");
            case 6: //每星期
                return cron.sendAt().format("YYYY-MM-DD 每星期运行一次");
        }
        return "错误表达式";
    } else {
        return cron.sendAt().format("YYYY-MM-DD HH:mm:ss");
    }
}
