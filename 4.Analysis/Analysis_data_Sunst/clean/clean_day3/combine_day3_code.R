# 加载所需的包
library(readr)
library(dplyr)
library(purrr)

library(rio)
library(plyr)

# 创建一个空的数据框来保存合并后的数据
merged_data <- data.frame()
##一定要设置在clean_day1下的工作路径和清空环境
# 遍历文件夹phase_003至phase_020
for (i in 3:20) {
  # 构建文件夹名称
  folder <- paste0("phase_", sprintf("%03d", i))
  # 构建文件路径
  file <- paste0("day3_q_", folder, ".csv")
  # 构建完整的文件路径
  path <- file.path(folder, file)
  
  # 检查文件是否存在
  if (file.exists(path)) {
    # 读取CSV文件
    data <- import(path)
    # 将数据追加到merged_data中
    merged_data <- rbind.fill(merged_data, data)
  } else {
    message(paste("File", path, "does not exist."))
  }
}

# 查看合并后的数据
head(merged_data)

# 合并后的数据写入新的CSV文件
write.csv(merged_data, file = "merged_data3.csv", row.names = FALSE)
