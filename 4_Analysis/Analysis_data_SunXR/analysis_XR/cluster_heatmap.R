library(linkET)
library(vegan)
library(RColorBrewer)
library(tidyverse)
library(ggnewscale)
library(RColorBrewer)
library(dplyr)
# 计算 data_q 的距离矩阵 (Bray-Curtis 距离)
#dist_data_q <- vegdist(data_q, method = "euclidean")

# 计算 K-Means 聚类中心的距离矩阵 (欧几里得距离)
#dist_kmeans <- dist(kmeans_result$centers, method = "euclidean")

kmeans_result <- kmeans(data_q, centers = k, nstart = 25)

# 将 kmeans_result$cluster 转换为数据框
cluster_df <- data.frame(
  Observation = 1:length(kmeans_result$cluster), # 观测的索引
  Cluster = as.factor(kmeans_result$cluster)     # 聚类标签，转换为因子
)

# 查看数据框
print(cluster_df)



# 替换原始 Mantel 检验的代码
mantel <- manteltest(
  data_q,  # 原始数据
  cluster_df,  # K-Means 聚类结果数据框
  spec_select = list(
    "Cluster_1" = which(cluster_df$Cluster == 1),
    "Cluster_2" = which(cluster_df$Cluster == 2),
    "Cluster_3" = which(cluster_df$Cluster == 3)
  )
) %>%
  mutate(rd = cut(r, breaks = c(-Inf, 0.2, 0.3, Inf),
                  labels = c("< 0.2", "0.2 - 0.3", ">= 0.3")),
         pd = cut(p, breaks = c(-Inf, 0.005, 0.01, 0.05, Inf),
                  labels = c("< 0.005", "0.005 - 0.01", "0.01 - 0.05", ">= 0.05")))
p2 <- qcorrplot(correlate(varechem), type = "upper", diag=FALSE, grid_col = NA) + 
  geom_point(shape=21, size=8, fill = NA, stroke = 0.35, color = "black") + 
  geom_point(aes(size=abs(r), fill=r),
             shape=21,
             stroke = 0.35,
             color = "black") + 
  scale_size(range = c(1, 8), guide = "none") + 
  new_scale("size") + 
  geom_couple(data = mantel,
              aes(color = pd, size = rd), 
              label.size = 3.88,
              label.family = "", 
              label.fontface = 1, 
              nudge_x = 0.2, 
              curvature = nice_curvature(by = "from")) + 
  scale_fill_gradientn(limits = c(-0.8,0.8),
                       breaks = seq(-0.8,0.8,0.4),
                       colors = rev(brewer.pal(11, "Spectral"))) + 
  scale_size_manual(values = c(0.5, 1.5, 3)) + 
  scale_color_manual(values = color_pal(4, alpha = 0.6)) + 
  guides(size = guide_legend(title = "Mantel's r", 
                             order = 2, 
                             keyheight = unit(0.5, "cm")), 
         colour = guide_legend(title = "Mantel's p", 
                               order = 1, 
                               keyheight = unit(0.5, "cm")),
         fill = guide_colorbar(title = "Pearson's r", 
                               keyheight = unit(2.2, "cm"), 
                               keywidth = unit(0.5, "cm"), 
                               order = 3)) +   theme(legend.box.spacing = unit(0, "pt"))
ggsave(p2,file = "Corr heatmap2 with data_q.pdf",width = 8.8, height = 6)


