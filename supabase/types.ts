
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          created_at: string
          date: string | null
          description: string | null
          id: number
          leader_id: string | null
          name: string
          time: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: number
          leader_id?: string | null
          name: string
          time: string
        }
        Update: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: number
          leader_id?: string | null
          name?: string
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      camp_sessions: {
        Row: {
          begin_date: string
          created_at: string
          end_date: string
          id: number
        }
        Insert: {
          begin_date: string
          created_at?: string
          end_date: string
          id?: number
        }
        Update: {
          begin_date?: string
          created_at?: string
          end_date?: string
          id?: number
        }
        Relationships: []
      }
      cash_register: {
        Row: {
          created_at: string
          denomination: Database["public"]["Enums"]["euro_denominations"]
          group_id: number
          id: number
          quantity: number
        }
        Insert: {
          created_at?: string
          denomination: Database["public"]["Enums"]["euro_denominations"]
          group_id: number
          id?: number
          quantity?: number
        }
        Update: {
          created_at?: string
          denomination?: Database["public"]["Enums"]["euro_denominations"]
          group_id?: number
          id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cash_register_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      child_parent_link: {
        Row: {
          child_id: string
          created_at: string
          id: number
          parent_id: string
        }
        Insert: {
          child_id: string
          created_at?: string
          id?: number
          parent_id: string
        }
        Update: {
          child_id?: string
          created_at?: string
          id?: number
          parent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "child_parent_link_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_parent_link_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          access_code: string
          birth_date: string | null
          created_at: string
          first_name: string
          gender: Database["public"]["Enums"]["gender"]
          id: string
          last_name: string
        }
        Insert: {
          access_code: string
          birth_date?: string | null
          created_at?: string
          first_name: string
          gender: Database["public"]["Enums"]["gender"]
          id?: string
          last_name: string
        }
        Update: {
          access_code?: string
          birth_date?: string | null
          created_at?: string
          first_name?: string
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          last_name?: string
        }
        Relationships: []
      }
      group_accounts: {
        Row: {
          account_balance: number
          child_id: string
          created_at: string
          group_id: number
          id: number
        }
        Insert: {
          account_balance?: number
          child_id: string
          created_at?: string
          group_id: number
          id?: number
        }
        Update: {
          account_balance?: number
          child_id?: string
          created_at?: string
          group_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "group_accounts_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_accounts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_chats: {
        Row: {
          created_at: string
          id: number
          name: string | null
          session_range: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          session_range: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          session_range?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_chats_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "camp_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          id: number
          leader_id: string | null
          name: string | null
          number: number
          session_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          leader_id?: string | null
          name?: string | null
          number: number
          session_id: number
        }
        Update: {
          created_at?: string
          id?: number
          leader_id?: string | null
          name?: string | null
          number?: number
          session_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "groups_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "camp_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          group_chat_id: number
          id: number
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          group_chat_id: number
          id?: number
          sender_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          group_chat_id?: number
          id?: number
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_group_chat_id_fkey"
            columns: ["group_chat_id"]
            isOneToOne: false
            referencedRelation: "group_chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          child_id: string | null
          created_at: string
          group_id: number
          id: number
          type: Database["public"]["Enums"]["transaction_type"]
        }
        Insert: {
          amount: number
          child_id?: string | null
          created_at?: string
          group_id: number
          id?: number
          type: Database["public"]["Enums"]["transaction_type"]
        }
        Update: {
          amount?: number
          child_id?: string | null
          created_at?: string
          group_id?: number
          id?: number
          type?: Database["public"]["Enums"]["transaction_type"]
        }
        Relationships: [
          {
            foreignKeyName: "transactions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          birth_date: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          role: Database["public"]["Enums"]["camp_roles"]
        }
        Insert: {
          birth_date?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          role?: Database["public"]["Enums"]["camp_roles"]
        }
        Update: {
          birth_date?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          role?: Database["public"]["Enums"]["camp_roles"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_access_code: { Args: { uuid_input: string }; Returns: string }
      get_current_group_id_by_leader_id: {
        Args: { p_leader_id: string }
        Returns: number
      }
      process_single_cash_action: {
        Args: {
          input: Database["public"]["CompositeTypes"]["single_cash_action_input"]
        }
        Returns: Json
      }
      process_transaction: {
        Args: {
          cash_register_records: Database["public"]["CompositeTypes"]["cash_register_record"][]
          child_id: string
          new_balance: number
        }
        Returns: Json
      }
    }
    Enums: {
      camp_roles: "CAMP_LEADER" | "GROUP_LEADER" | "PARENT" | "USER"
      euro_denominations:
        | "500_EUR"
        | "200_EUR"
        | "100_EUR"
        | "50_EUR"
        | "20_EUR"
        | "10_EUR"
        | "5_EUR"
        | "2_EUR"
        | "1_EUR"
        | "50_CENT"
        | "20_CENT"
        | "10_CENT"
        | "5_CENT"
        | "2_CENT"
        | "1_CENT"
      gender: "MALE" | "FEMALE"
      transaction_type:
        | "DEPOSIT"
        | "WITHDRAWAL"
        | "PURCHASE"
        | "PAYOUT"
        | "PAYBACK"
    }
    CompositeTypes: {
      cash_register_record: {
        denomination: Database["public"]["Enums"]["euro_denominations"] | null
        quantity: number | null
      }
      single_cash_action_input: {
        leader_id: string | null
        child_id: string | null
        transaction_amount: number | null
        transaction_type: Database["public"]["Enums"]["transaction_type"] | null
        denominations_updates:
          | Database["public"]["CompositeTypes"]["cash_register_record"][]
          | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      camp_roles: ["CAMP_LEADER", "GROUP_LEADER", "PARENT", "USER"],
      euro_denominations: [
        "500_EUR",
        "200_EUR",
        "100_EUR",
        "50_EUR",
        "20_EUR",
        "10_EUR",
        "5_EUR",
        "2_EUR",
        "1_EUR",
        "50_CENT",
        "20_CENT",
        "10_CENT",
        "5_CENT",
        "2_CENT",
        "1_CENT",
      ],
      gender: ["MALE", "FEMALE"],
      transaction_type: [
        "DEPOSIT",
        "WITHDRAWAL",
        "PURCHASE",
        "PAYOUT",
        "PAYBACK",
      ],
    },
  },
} as const
