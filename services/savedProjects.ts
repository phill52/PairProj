
const getSavedProjects = async (supabase: any) => {

    let { data: SavedProjects, error } = await supabase
        .from('Saved_Project').select('*')

        if (error) {
            throw new Error(error)
        }

    return SavedProjects

    }
