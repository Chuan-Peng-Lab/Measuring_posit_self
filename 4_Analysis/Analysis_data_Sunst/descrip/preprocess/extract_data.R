
setwd("D:/Sun/job/SEE_Online/Measuring_posit_self/4.Analysis/Data/descrip/preprocess")


# 检查是否已安装 pacman
if (!requireNamespace("pacman", quietly = TRUE)) {
  install.packages("pacman") }   # 如果未安装，则安装包
#install.packages("cowplot")
# 加载所需要的R包
pacman::p_load("lme4","tidyverse","bruceR","ggplot2","ggridges","psych","psychTools","DataExplorer","ggsci","patchwork","cowplot","ggpubr","BayesFactor","careless","rticles"," TreeBUGS","igraph","brms","here","qgraph","randomForest","bootnet")
pacman::p_load("ggpubr","gghalves")
source("../R_rainclouds.R")


# 将clean data内的数据根据day3的最终被试选取这部分数据存入select
select_files <- function(phase) {
  main_folder <- "../../Data/clean/"
 
day3_q <- read.csv( file=paste0("../../Data/clean/clean_day3/",phase,"/day3_q_", phase, ".csv"), fileEncoding = 'UTF-8', header = TRUE)
 #subj_day3 <- read.xlsx(paste0("../../../Data/select/select_day2.xlsx"))
  # 获取所有子文件夹的路径
  subfolders <- list.files(path = main_folder, pattern = "clean_day[0-3]", full.names = TRUE)
  select_subj <- unique(day3_q$ID)##根据day3的被试选择数据

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
        output_file <- paste0("../../Data/select/", var_name, ".csv")
        
        # 修改写入 csv 文件的语句，指定正确的 data.frame 和文件路径
        write.csv(var_data, file = output_file, row.names = FALSE)
      }
    }
  }
}

select_files("phase_020")



#合并select内的各问卷和任务的目前所有阶段的数据储存在all内}
merge_files <- function(prefix) {
  input_folder <- "../../Data/select/"
  output_folder <- "../../Data/all/"
  
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



# 设置主文件夹路径
main_folder <- "../../../Data/clean/clean_day2/"

# 获取所有以"phase"开头的子文件夹的路径
subfolders <- list.files(path = main_folder,  full.names = TRUE)

# 初始化合并后的数据框
merged_data <- NULL

# 循环遍历每个子文件夹
for (subfolder in subfolders) {
  # 获取当前子文件夹内以"SRET"开头的CSV文件
  csv_files <- list.files(path = subfolder, pattern = "^SRET.*\\.csv$", full.names = TRUE)
  
  # 循环遍历每个CSV文件，并进行合并
  for (csv_file in csv_files) {
    temp_data <- read.csv(csv_file)
    merged_data <- rbind(merged_data, temp_data)
  }
}

# 保存合并后的数据框为CSV文件
write.csv(merged_data, file = "../../../Data/select/SRET/SRET.csv", row.names = FALSE)



day3_q_all<-read.csv("../../../Data/all/day3_q_all.csv")
day3_q_all.0<-read.csv("../../../Data/all/day3_q_all.csv")
SRET<-read.csv("../../../Data/all/SRET_all.csv")%>%
  subset(., ID %in% day3_q_all$ID)
ALT1_all<-read.csv("../../../Data/all/ALT1_all.csv")%>%
  subset(., ID %in% day3_q_all$ID)
day0_all<-read.csv("../../../Data/all/day0_all.csv")%>%
  subset(., ID %in% day3_q_all$ID)
day1_q_all<-read.csv("../../../Data/all/day1_q_all.csv")%>%
  subset(., ID %in% day3_q_all$ID)
day2_q_all<-read.csv("../../../Data/all/day2_q_all.csv")%>%
  subset(., ID %in% day3_q_all$ID)
IAT_all<-read.csv("../../../Data/all/IAT_all.csv")%>%
  subset(., ID %in% day3_q_all$ID)
ALT2_all<-read.csv("../../../Data/all/ALT2_all.csv")%>%
  subset(., ID %in% day3_q_all$ID)

day3_q_all.0<-day3_q_all.0%>%
  select(-c("gad","phq"))
  select(-c("trap3","ParticipantID","trap3_item","X"))
day3_q_all.0[, 2:ncol(day3_q_all.0)] <- scale(day3_q_all.0[, 2:ncol(day3_q_all.0)])
write.csv(day3_q_all.0,"day3_q_all.0.csv")

day3_q_all.name <- grep("^phq_|^gad_|^SGPS_|^swb_", names(day3_q_all.0), value = TRUE)
day3_q_all.0[day3_q_all.name] <- scale(day3_q_all.0[day3_q_all.name])

# SEE指标的提取
ALT2_dprime.0<-ALT2_dprime%>%
  select(ID,domain,valence,person,dprime)%>%
  pivot_wider(names_from = person,values_from = dprime)%>%
  mutate(ALT_SE2_ref=self-friend)%>%
  ungroup()
ALT2_dprime.1<-ALT2_dprime%>%
  select(ID,domain,valence,person,dprime)%>%
  pivot_wider(names_from = valence,values_from = dprime)%>%
  filter(person=="self")%>%
  mutate(ALT_SE2_val=positive-negative)%>%
  ungroup()

ALT2.1.1<-ALT2.1%>%
  select(ID,domain,ALT_SE_val)%>%
  pivot_wider(names_from = domain,values_from = ALT_SE_val)%>%
  rename(moral_ALT_rt_val=moral,
         ability_ALT_rt_val=ability)

ALT2.1.2<-ALT2.1%>%
  select(ID,domain,ALT_SE_ref)%>%
  pivot_wider(names_from = domain,values_from = ALT_SE_ref)%>%
  rename(moral_ALT_rt_ref=moral,
         ability_ALT_rt_ref=ability)

ALT2_dprime.0.1<-ALT2_dprime.0%>%
  filter(valence=="positive")%>%
  select(ID,domain,ALT_SE2_ref)%>%
  pivot_wider(names_from = domain,values_from = ALT_SE2_ref)%>%
  rename(moral_ALT_d_ref=moral,
         ability_ALT_d_ref=ability)

ALT2_dprime.0.2<-ALT2_dprime.1%>%
  select(ID,domain,ALT_SE2_val)%>%
  pivot_wider(names_from = domain,values_from = ALT_SE2_val)%>%
  rename(moral_ALT_d_val=moral,
         ability_ALT_d_val=ability)


IAT_data_D.0<-IAT_data_D%>%
  select(ID,domain,IAT_SE)%>%
  pivot_wider(names_from = domain,values_from = IAT_SE)%>%
  rename(moral_IAT=moral,
         ability_IAT=ability)



SRET_EW.0.1<-IAT_data_D.0%>%
  select(ID,domain,SRET_SE)%>%
  pivot_wider(names_from = domain,values_from = SRET_SE)%>%
  rename(moral_SRET_EW=moral,
         ability_SRET_EW=ability)

task_SE<-IAT_data_D.0%>%
  left_join(ALT2.1.1,by=c("ID"))%>%
  left_join(ALT2.1.2,by=c("ID"))%>%
  left_join(SRET_EW.0.1,by=c("ID"))%>%
  left_join(ALT2_dprime.0.2,by=c("ID"))%>%
  left_join(ALT2_dprime.0.1,by=c("ID"))
  
  write.csv(task_SE,"task_SE_Z.csv")

  columns_to_standardize <- 2:ncol(day3_q_all)  # 从第二列开始直到最后一列
  
  # 使用scale()函数对这些列进行z分数标准化
  day3_q_all[, columns_to_standardize] <- scale(day3_q_all[, columns_to_standardize])
  
  day3_q_all<-day3_q_all %>%
    select(-starts_with(c("phq_", "gad_", "swb_", "SGPS_")))
  
  task_q<-day3_q_all%>%
    left_join(task_SE,by=c("ID"))
  day3_q<-day3_q%>%select(ID,phq_al,gad_al,SGPS_al,swb_al)
  rf_all<-task_q%>%
    left_join(day3_q,by=c("ID"))
  rf_all[, (ncol(rf_all)-3):ncol(rf_all)] <- scale(rf_all[, (ncol(rf_all)-3):ncol(rf_all)])       
  ####################3
   gad.rt<-rf_all%>%
    select(-c("ID","phq_al","SGPS_al","swb_al"))

  gad.rt <- randomForest(gad_al ~ ., data=gad.rt, importance=TRUE,
                          proximity=TRUE)
  plot(gad.rt)
  print(gad.rt)
  varImpPlot(gad.rt) 
  write.csv(importance(gad.rt),"importance_gad.csv")
  
  
  #######
  swb.rt<-rf_all%>%
    select(-c("ID","phq_al","SGPS_al","gad_al"))
  
  swb.rt <- randomForest(swb_al ~ ., data=swb.rt, importance=TRUE,
                         proximity=TRUE)
  plot(swb.rt)
  print(swb.rt)
  varImpPlot(swb.rt) 
  write.csv(importance(swb.rt),"importance_swb.csv")
  
  #######
 SGPS.rt<-rf_all%>%
    select(-c("ID","phq_al","gad_al","swb_al"))
  
  SGPS.rt <- randomForest(SGPS_al ~ ., data=SGPS.rt, importance=TRUE,
                         proximity=TRUE)
  plot(SGPS.rt)
  print(SGPS.rt)
  varImpPlot(SGPS.rt) 
  write.csv(importance(SGPS.rt),"importance_SGPS.csv")
  
  ###############
  phq.rt<-rf_all%>%
    select(-c("ID","SGPS_al","gad_al","swb_al"))
  
  phq.rt <- randomForest(phq_al ~ ., data=phq.rt, importance=TRUE,
                          proximity=TRUE)
  plot(phq.rt)
  print(phq.rt)
  varImpPlot(phq.rt) 
  write.csv(importance(phq.rt),"importance_phq.csv")
  
  