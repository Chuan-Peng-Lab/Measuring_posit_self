library(corrplot)
data1<-read.csv("/Users/sunxinru/Desktop/Analysis_data_SunXR/correlation_rename.csv")
M<-cor(data, method = "pearson")

png(file = "相关图6.png", res = 600, width = 4970, height = 3060)
col <- colorRampPalette(c("lightpink", "white", "lightseagreen"))(100)
corrplot(
  M, 
  method = "pie",
  type = "upper",
  order = "original",
  cl.ratio = 0.1,
  tl.col = "paleturquoise4",
  tl.srt = 45,
  tl.cex = 0.5,
  col = col,
  diag = FALSE
)
dev.off()

# -------------------------------------------------------------------------
library(tidyverse)
library(RColorBrewer)
library(ggtext)
library(magrittr)
library(reshape2)
library(ggplot2)
library(psych)
library(vegan)
library(dplyr)

data2<-read.csv("/Users/sunxinru/Desktop/Analysis_data_SunXR/correlation_rename.csv")
# 创建一个示例矩阵
set.seed(123)  # 为了可重复性设置随机种子
data_matrix <- matrix(rnorm(100), nrow=10)

# 初始化一个列表来存储结果
results_list <- list()

# 迭代计算每对变量的相关系数和p值
for (i in 1:ncol(data_matrix)) {
  for (j in i:ncol(data_matrix)) {
    if (i == j) {
      # 相同的变量，相关系数为1，p值为NA
      results_list[[length(results_list) + 1]] <- c(i, j, 1, NA)
    } else {
      # 计算不同变量之间的相关系数和p值
      cor_test <- cor.test(data_matrix[, i], data_matrix[, j], method = "pearson")
      results_list[[length(results_list) + 1]] <- c(i, j, cor_test$estimate, cor_test$p.value)
    }
  }
}

# 将列表转换为数据框
results_df <- do.call(rbind, results_list)
colnames(results_df) <- c("Var1", "Var2", "r", "p")
write.csv(results_df, "result.csv", row.names = TRUE)
# 查看结果
print(results_df)
results_df <- as.data.frame(results_df)

results_df <- results_df %>%
mutate(rd = cut(r, breaks = c(-Inf, 0.2, 0.4, Inf),
                labels = c("<0.2", "0.2 - 0.4", ">= 0.4")),
       pd = cut(p, breaks = c(-Inf, 0.01, 0.05, Inf),
                labels = c("< 0.01", "0.01 - 0.05", ">= 0.05")))
#绘制热图
qcorrplot(cor(data2, method = "pearson"), diag = F, type = "lower")+
  geom_tile()+
  geom_mark(size = 2.5, sig.thres = 0.05, sep = "\n")+
  geom_couple(aes(colour=pd, size=rd), data=mantel,label.colour = "black",
              curvature=nice_curvature(0.15),
              nudge_x=0.2,
              label.fontface=2,
              label.size=4,
              drop = T)+
  scale_fill_gradientn(colours = RColorBrewer::brewer.pal(11,"RdBu"))+
  scale_size_manual(values = c(0.5, 1, 2))+
  scale_color_manual(values = c("#d95f02", "#1b9e77", "#a2a2a288"))+
  guides(size = guide_legend(title = "Mantel's r", override.aes = list(colour = "grey35"),order = 2),
         colour = guide_legend(title = "Mantel's p" ,override.aes = list(size = 3),order = 1),
         fill = guide_colorbar(title = "pearson's r",order = 3))+
  theme(plot.margin = unit(c(0,0,0,1),units = "cm"),
        legend.background = element_blank(),
        legend.key = element_blank(),
        axis.text = element_markdown(colour = "black",size = 8))


# significant_correlation_heatmap-------------------------------------------------------------------------
# 安装和加载必要的包
library(Hmisc)

# 读取CSV文件
data <- read.csv("correlation_rename.csv", check.names = FALSE)

# 计算相关系数矩阵及其显著性
cor_matrix <- rcorr(as.matrix(data))

# 从rcorr对象中提取相关系数矩阵和p值矩阵
cor_df <- as.data.frame(cor_matrix$r)
p_df <- as.data.frame(cor_matrix$P)

# 将p值矩阵转换为下三角形式，并设置不显著的相关系数为NA
p_df_lower <- p_df
p_df_lower[upper.tri(p_df_lower)] <- NA
cor_df[!is.na(p_df_lower) & p_df_lower > 0.05] <- NA

# 使用ggcorrplot绘制只包含显著相关的热图
p <- ggcorrplot(cor_df, 
           method = "square", type = "lower", 
           outline.color = "white", 
           title = "Significant Correlation Heatmap",
           ggtheme = ggplot2::theme_minimal()) +
  # 调整标题样式
  theme(plot.title = element_text(hjust = 0.5, size = 16, face = "bold")) +
  # 调整图例样式
  theme(legend.position = "right") +
  theme(legend.title = element_text(size = 12, face = "bold")) +
  theme(legend.text = element_text(size = 10)) +
  # 调整轴文本样式
  theme(axis.text = element_text(size = 20)) +
  # 调整网格线样式
  theme(panel.grid.major = element_line(color = "gray90", size = 0.5)) +
  theme(panel.grid.minor = element_blank()) +
  # 调整面板背景
  theme(panel.background = element_rect(fill = "white", color = NA)) +
  # 调整绘图区域背景
  theme(plot.background = element_rect(fill = "white", color = NA))
# 保存图形，设置宽度和高度
ggsave("significant_correlation_heatmap.png", plot = p, width = 10, height = 8, dpi = 300)


# -------------------------------------------------------------------------



