# **Automated Machine Learning and Interpretability in Psychology: A Practical Tutorial with AutoGluon in Python**

This project is an implementation of automated machine learning and interpretability in psychology using AutoGluon in Python.

## Description

This study provides code blocks for the following functionalities:
- Data Import
- Feature Selection
- Handling Anomalies
- Data Standardization or Normalization
- Encoding Categorical Variables

The dataset is split into a training set and a test set in an 8:2 ratio. In the binary classification demo, the data is divided into high resilience and low resilience groups based on the top and bottom 27% of resilience scores. In the regression demo, the original total score of the CD-RISC is retained as the learning indicator. The AutoGluon training parameters are set to `best_quality`.

## Code Blocks

The code provided in this study includes several functional blocks:

1. **Data Import**
2. **Feature Selection**
3. **Handling Anomalies**
4. **Data Standardization or Normalization**
5. **Encoding Categorical Variables**

# Deployment Guide

To deploy this tutorial, you can follow these steps to set up the computing environment and run the code:

## Install Python
Ensure that Python 3.8 or later is installed on your computer. You can download and install it from the [Python official website](https://www.python.org/).

## Create a Virtual Environment
It's recommended to create a virtual environment in the project folder to manage dependencies and avoid conflicts with other projects. Run the following command in the command line:

```bash
python -m venv env
```

Then, activate the virtual environment:

- **Windows**: `env\Scripts\activate`
- **Mac and Linux**: `source env/bin/activate`

## Installation

After activating the virtual environment, install the required Python libraries by running:

```bash
pip install pandas numpy scikit-learn autogluon scipy shap matplotlib factor-analyzer
```

## Usage

You can run the provided code in a Python environment. Make sure to adjust the paths and parameters according to your dataset and requirements.

## License

This project is licensed under the terms of the following licenses for the included libraries:

- **Pandas**: BSD 3-Clause License
- **NumPy**: BSD 3-Clause License
- **Scikit-learn**: BSD 3-Clause License
- **AutoGluon**: Apache License 2.0
- **SciPy**: BSD License
- **SHAP**: MIT License
- **Matplotlib**: PSF License
- **Factor Analyzer**: MIT License

Please ensure to adhere to these licenses when using and distributing this project.

## References

- Harris, C. R., Millman, K. J., van der Walt, S. J., Gommers, R., Virtanen, P., Cournapeau, D., ... & Oliphant, T. E. (2020). Array programming with NumPy. Nature, 585(7825), 357-362.
- Pedregosa, F., Varoquaux, G., Gramfort, A., Michel, V., Thirion, B., Grisel, O., ... & Duchesnay, E. (2011). Scikit-learn: Machine learning in Python. Journal of machine learning research, 12, 2825-2830.
- Erickson, N., Mueller, J., Yamaguchi, K., Hsiao, J., & Larsen, P. (2020). AutoGluon-Tabular: Robust and Accurate AutoML for Structured Data. arXiv preprint arXiv:2003.06505.
