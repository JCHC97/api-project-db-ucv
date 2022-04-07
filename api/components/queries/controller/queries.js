const queries = {
  querie1: `
    SELECT
      p.Cod_pais,
      p.NombPais,
      COUNT(contagios.Doc_identidad) AS cant_personas, #será menor que la suma de los tratamientos
      SUM(contagios.casa) AS tratados_casa,  
      SUM(contagios.hospitalizado) AS tratados_hospitalizado,  
      SUM(contagios.sinTratamiento) AS tratados_sinTratamiento 
    FROM (  #pacientes contagiados mas de una vez y sus tratamientos
      SELECT
        c.Doc_identidad,
        SUM( IF(pr.casa_hospitalizado = 'casa', 1, 0) ) AS casa,  
        SUM( IF(pr.casa_hospitalizado = 'hospitalizado', 1, 0) ) AS hospitalizado,  
        SUM( IF(pr.casa_hospitalizado IS NULL, 1, 0) ) AS sinTratamiento  
      FROM contagio AS c
      LEFT JOIN paciente_requiere AS pr
        ON c.Doc_identidad = pr.Doc_identidad AND c.fecha_contagio = pr.fecha_aplica_trat 
      GROUP BY c.Doc_identidad
      HAVING COUNT(c.Doc_identidad) > 1
    ) AS contagios
    LEFT JOIN vive AS v
        ON contagios.Doc_identidad = v.Doc_identidad
      LEFT JOIN municipio AS m
        ON v.Cod_municipio = m.Cod_municipio
      LEFT JOIN Estado_Provincia AS e
        ON m.Cod_estado = e.Cod_estado
      LEFT JOIN pais AS p
        ON e.Cod_pais = p.Cod_pais
    GROUP BY p.Cod_pais, p.NombPais
  `,
  querie2: `
    SELECT
      Cod_centro,
      (SELECT NombCentro FROM centro_salud WHERE Cod_centro = vac_con.Cod_centro) AS NombCentro,
      #SUM(IF(contagio_luego = 1, contagio_luego, 0)) AS contagiados_luego,
      #SELECT COUNT(DISTINCT Doc_persona) FROM vacunada WHERE Cod_centro = vac_con.Cod_centro AS vacunados
      #contagiados_luego / vacunados
      SUM(IF(contagio_luego = 1, contagio_luego, 0)) / (
        SELECT COUNT(DISTINCT Doc_persona) FROM vacunada WHERE Cod_centro = vac_con.Cod_centro
      ) * 100 AS porcentaje_contagiados_luego 
    FROM (
      SELECT 
        Cod_centro, 
        Doc_persona, 
        MIN(fecha_vacunacion) AS primer_vacuna,
        c.ult_contagio,
        IF(MIN(fecha_vacunacion) < c.ult_contagio, 1, 0) AS contagio_luego
      FROM vacunada AS v
      LEFT JOIN (
        SELECT 
          Doc_identidad, 
          MAX(fecha_contagio) AS ult_contagio
        FROM contagio
        GROUP BY Doc_identidad
      ) AS c
        ON v.Doc_persona = c.Doc_identidad
      GROUP BY Cod_centro, Doc_persona, c.ult_contagio
    ) AS vac_con
    GROUP BY Cod_centro
  `,
  querie3: `
    SELECT AVG(eficaz.eficacia), Vacuna.NombVacuna FROM eficaz 
    LEFT JOIN Vacuna ON eficaz.Id_Vacuna = Vacuna.Id_Vacuna
    RIGHT JOIN Virus_Variante ON eficaz.Denom_OMS = Virus_Variante.Denom_OMS
    INNER JOIN contagio ON eficaz.Denom_OMS = contagio.Denom_OMS
    GROUP BY (Vacuna.NombVacuna);
  `,
  querie4: `
    SELECT
      Tratamiento.Cod_tratamiento, 
      Tratamiento.DescripTratamiento, 
      Virus_Variante.Denom_OMS, 
      Virus_Variante.Clasificacion
    FROM contagio
    LEFT JOIN Paciente_Requiere 
      ON contagio.fecha_contagio = Paciente_Requiere.fecha_aplica_trat
      LEFT JOIN Virus_Variante 
      ON contagio.Denom_OMS = Virus_Variante.Denom_OMS
      LEFT JOIN Paciente 
      ON contagio.Doc_identidad = Paciente.Doc_identidad
      LEFT JOIN Tratamiento 
      ON Paciente_Requiere.Cod_tratamiento = Tratamiento.Cod_tratamiento;
  `,
  querie5: `  
    SELECT 
      cont_var_max.Denom_OMS,
      cont_var_pais.NombPais,
      cont_var_max.contagios_pais_max
    FROM ( -- Información de variantes y su cantidad maxima de contagios en un país 
      SELECT 
        Denom_OMS,
        MAX(contagios_pais) AS contagios_pais_max
      FROM (
        SELECT
          c.Denom_OMS AS Denom_OMS,
          p.NombPais AS NombPais,
          COUNT(c.Doc_identidad) AS contagios_pais
        FROM contagio AS c
        LEFT JOIN vive AS v
          ON c.Doc_identidad = v.Doc_identidad
        LEFT JOIN municipio AS m
          ON v.Cod_municipio = m.Cod_municipio
        LEFT JOIN Estado_Provincia AS e
          ON m.Cod_estado = e.Cod_estado
        LEFT JOIN pais AS p
          ON e.Cod_pais = p.Cod_pais
        GROUP BY c.Denom_OMS, p.NombPais
      ) AS cp_aux
      GROUP BY cp_aux.Denom_OMS
    ) AS cont_var_max
    LEFT JOIN ( -- Información de variantes y la cantidad de contagios por país
      SELECT
        c.Denom_OMS AS Denom_OMS,
        p.NombPais AS NombPais,
        COUNT(c.Doc_identidad) AS contagios_pais
      FROM contagio AS c
      LEFT JOIN vive AS v
        ON c.Doc_identidad = v.Doc_identidad
      LEFT JOIN municipio AS m
        ON v.Cod_municipio = m.Cod_municipio
      LEFT JOIN Estado_Provincia AS e
        ON m.Cod_estado = e.Cod_estado
      LEFT JOIN pais AS p
        ON e.Cod_pais = p.Cod_pais
      GROUP BY c.Denom_OMS, p.NombPais
    ) AS cont_var_pais
      ON  cont_var_max.Denom_OMS = cont_var_pais.Denom_OMS
      AND  cont_var_max.contagios_pais_max = cont_var_pais.contagios_pais
  `,
  querie6: `
    SELECT Denom_OMS, COUNT(Doc_identidad)
    FROM contagio
    GROUP BY Denom_OMS
    ORDER BY 2 Desc
    LIMIT 3
  `
}

export default queries