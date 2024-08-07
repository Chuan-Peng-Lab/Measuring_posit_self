# 加载所需的包
library(readr)
library(dplyr)
library(purrr)

# 设置工作目录到包含phase_001至phase_020文件夹的路径
# 初始化一个空的data frame用于存储合并后的数据
merged_data <- data.frame()

# 遍历文件夹phase_003至phase_020
for(i in 3:20) {
  folder_name <- paste0("phase_", sprintf("%03d", i))
  file_name <- paste0("day0_all_", folder_name, ".csv")
  file_path <- paste0(folder_name, "/", file_name)
  
  # 检查文件是否存在
  if(file.exists(file_path)) {
    # 读取CSV文件，指定文件编码为UTF-8
    data <- read.csv(file_path, header = TRUE, fileEncoding = "UTF-8")
    # 将数据追加到merged_data中
    merged_data <- rbind(merged_data, data)
  } else {
    cat("文件不存在：", file_path, "\n")
  }
}

# 合并后的数据写入新的CSV文件
write.csv(merged_data, file = "merged_data.csv", row.names = FALSE)


