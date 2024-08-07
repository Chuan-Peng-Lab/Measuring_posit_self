library(dplyr)
##读取数据之前一定要设置工作路径
day0 <- read_csv("clean_day0/merged_data0.csv")
day1 <- read_csv("clean_day1/merged_data1.csv")
day2 <- read_csv("clean_day2/merged_data2.csv")
day3 <- read_csv("clean_day3/merged_data3.csv")

#选取day0 中的问卷数据,1select_code 主要放置的是选取的问卷数据的代码
# 生成列名
selfclarity_columns <- paste0("selfclarity_", seq(1, 12))
phq_columns <- paste0("phq_", seq(1, 9))
gad_columns <- paste0("gad_", seq(1, 7))

# 选择列
select_day0 <- day0 %>%
  select(one_of(c(selfclarity_columns , phq_columns, gad_columns, "ID")))

write.csv(select_day0, file = "select_day0.csv", row.names = FALSE)


ses_columns <- paste0("ses_", seq(1, 10))
coreself_columns <- paste0("coreself_", seq(1, 10))
SGPS_columns <- paste0("SGPS_", seq(1, 9))
NPI_columns <- paste0("NPI", seq(1, 15))
hsns_columns <- paste0("hsns_", seq(1, 10))

select_day1 <- day1%>%
  select(one_of(c(ses_columns , coreself_columns, SGPS_columns,NPI_columns,hsns_columns, "ID")))

write.csv(select_day1, file = "select_day1.csv", row.names = FALSE)

swb_columns <- paste0("swb_", seq(1, 5))
LOT_columns <- paste0("LOT_", seq(1, 6))
IPC_columns <- paste0("IPC_", seq(1, 8))
MorIden_columns <- paste0("MorIden_", seq(1, 10))
moralSeImag_columns <- paste0("moralSeImag_", seq(1, 9))
sde_columns <- paste0("sde_", seq(1, 20))
IM_columns <- paste0("IM_", seq(1, 20))

select_day2 <- day2%>%
  select(one_of(c(swb_columns , LOT_columns, IPC_columns ,MorIden_columns,moralSeImag_columns,sde_columns,IM_columns,"ID")))

write.csv(select_day2, file = "select_day2.csv", row.names = FALSE)

domain_rating_columns <- paste0("domain_rating_", seq(1, 5))

select_day3 <- day3%>%
  select(one_of(c(selfclarity_columns , phq_columns, gad_columns,
                  ses_columns , coreself_columns, SGPS_columns,NPI_columns,hsns_columns,
                  swb_columns , LOT_columns, IPC_columns ,MorIden_columns,moralSeImag_columns,sde_columns,IM_columns,
                  domain_rating_columns,
                  "ID")))
write.csv(select_day3, file = "select_day3.csv", row.names = FALSE)