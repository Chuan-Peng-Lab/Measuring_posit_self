
setwd("D:/Sun/job/SEE_Online/Measuring_posit_self/4.Analysis/Data/descrip/preprocess")

# 将clean data内的数据根据day3的最终被试选取这部分数据存入select
select_files <- function(phase) {
  main_folder <- "../../../Data/clean/"
 
#day3_q <- read.csv( file=paste0("../../Data/clean/clean_day3/",phase,"/day3_q_", phase, ".csv"), fileEncoding = 'UTF-8', header = TRUE)
 subj_day3 <- read.xlsx(paste0("../../../Data/raw/day2/",phase,"/select_day2_",phase,".xlsx"))
  # 获取所有子文件夹的路径
  subfolders <- list.files(path = main_folder, pattern = "clean_day[0-3]", full.names = TRUE)
  select_subj <- unique(subj_day3$ID)##根据day3的被试选择数据

  for (subfolder in subfolders) {
    phase_folder <- file.path(subfolder, phase)

    # 检查 phase_0xx 文件夹是否存在
    if (dir.exists(phase_folder)) {
      # 获取 phase_0xx 文件夹下所有 CSV 文件的路径
      csv_files <- list.files(path = phase_folder, pattern = "\\.csv$", full.names = TRUE)
      
      # 循环读取每个 CSV 文件
      for (csv_file in csv_files) {
        var_name <- tools::file_path_sans_ext(basename(csv_file))
        data <- read.csv(csv_file, fileEncoding = 'UTF-8', header = TRUE)
        
        # 使用 subset 函数选择符合条件的行
        var_data <- subset(data, ID %in% select_subj)
        
        # 修改输出文件路径
        output_file <- paste0("../../../Data/select/", var_name, ".csv")
        
        # 修改写入 csv 文件的语句，指定正确的 data.frame 和文件路径
        write.csv(var_data, file = output_file, row.names = FALSE)
      }
    }
  }
}

select_files("phase_008")



#合并select内的各问卷和任务的目前所有阶段的数据储存在all内}
merge_files <- function(prefix) {
  input_folder <- "../../../Data/select/"
  output_folder <- "../../../Data/all/"
  
  # Get all files with the specified prefix
  files <- list.files(path = input_folder, pattern = paste0("^", prefix), full.names = TRUE)
  
  # Check if there are files with the specified prefix
  if (length(files) == 0) {
    cat("No files with the prefix", prefix, "found in the input folder.\n")
    return(NULL)
  }
  
  # Read and bind all files with the specified prefix
  all_data <- lapply(files, read.csv)
  
  # Convert columns to consistent type (e.g., character)
  all_data <- lapply(all_data, function(df) {
    df[] <- lapply(df, as.character)
    return(df)
  })
  
  merged_data <- bind_rows(all_data)
  
  # Define the output file path
  output_file <- file.path(output_folder, paste0(prefix, "_all.csv"))
  
  # Write the merged data to the output file
  write.csv(merged_data, file = output_file, row.names = FALSE)
  
  cat("Merged files with prefix", prefix, "into", output_file, "\n")
}


# Merge files for different prefixes
merge_files("day0")
merge_files("ALT2")
merge_files("day1_q")
merge_files("day2_q")

merge_files("ALT1")
merge_files("IAT")
merge_files("SRET")
merge_files("day3_q")