export interface ThresholdTable {

    id: number
    kpi: string
    banda: string
    poligono: string
    n_cond: number
    source_1_type?: string
    source_1_cell?: string
    source_1_value?: string
    source_1_criterio?: string
    ref_1_value?: string

    source_2_type?: string
    source_2_cell?: string
    source_2_value?: string
    source_2_criterio?: string
    ref_2_value?: string

    source_3_type?: string
    source_3_cell?: string
    source_3_value?: string
    source_3_criterio?: string
    ref_3_value?: string

    source_4_type?: string
    source_4_cell?: string
    source_4_value?: string
    source_4_criterio?: string
    ref_4_value?: string
    
    created_at?: string
}
