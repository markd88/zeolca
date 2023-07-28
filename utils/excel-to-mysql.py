# %%
import pandas as pd
import sqlalchemy as sql
import numpy as np

# %%
df = pd.DataFrame(pd.read_excel("output.xlsx"))


# %%
df.to_csv ("Test.csv", index = None, header=True)

# %%
connect_string = 'mysql://USER:PW@DBHOST/DB'
connect_string = 'mysql://root:admin123@127.0.0.1/my_db'
sql_engine = sql.create_engine(connect_string)

df.to_sql('factor_base_cpcd',sql_engine)


