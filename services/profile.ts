const getProfile = async (supabase: any, profileId: string) => {

    let { data: Profile, error } = await supabase
        .from('Profile').select('*').eq('id', profileId)

        if (error) {
            throw new Error(error)
        }

    return Profile

    }
